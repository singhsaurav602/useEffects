import React from "react";
import classes from "./Input.css";
export default function Input(props) {
  return (
    <div
      className={`${classes.control} ${
        props.Valid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.type}>{props.label}</label>
      <input
        //   type="email"
        type={props.type}
        //   id="email"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />

      {/* <div
        className={`${classes.control} ${
          pwdState.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={pwdState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
    </div> */}
    </div>
  );
}
