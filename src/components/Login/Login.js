import React, { useEffect, useState, useReducer, useContext } from "react";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return {
    value: "",
    isValid: false,
  };
};

const pwdReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return {
    value: "",
    isValid: false,
  };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [pwdState, dispatchPwd] = useReducer(pwdReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailValidity } = emailState;
  const { isValid: pwdValidity } = pwdState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Form validation");
      setFormIsValid(emailValidity && pwdValidity);
    }, 500);

    console.log("cleanup");
    return () => {
      clearTimeout(identifier);
    };
  }, [emailValidity, pwdValidity]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      emailState.value.includes("@") && pwdState.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPwd({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      emailState.value.includes("@") && pwdState.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPwd({ type: "INPUT_BLUR" });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const authContext = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(emailState.value, pwdState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          id="email"
          label="E-Mail"
          value={emailState.value}
          valid={emailValidity}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          value={pwdState.value}
          valid={pwdValidity}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
