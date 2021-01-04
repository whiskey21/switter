import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [IsLoggedIn, SetIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        SetIsLoggedIn(true);
        setUserObj(user);
      } else {
        SetIsLoggedIn(false);
      }
      setInit(true);
    });
  });

  const refreshUser = () => {
    setUserObj(authService.currentUser);
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          IsLoggedIn={IsLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing,,,"
      )}
      <footer>&copy; {new Date().getFullYear()} Switter</footer>
    </>
  );
}

export default App;
