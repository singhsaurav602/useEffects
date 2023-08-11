import React, { useContext } from "react";
import AuthContext from "./store/auth-context";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  /* ---- Autheticaltion state management is moved to auth-context file / AuthContextProviver component in order to keep the App component clean/lean ---*
  /*---
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userStorredLoginInformation = localStorage.getItem;
    if (userStorredLoginInformation.getItem === 1) setIsLoggedIn(true);
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", 1);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  --*/
  const authContext = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!authContext.isLoggedIn && <Login />}
        {authContext.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
