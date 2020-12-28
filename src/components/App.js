import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  // eslint-disable-next-line
  const [init, setInit] = useState(false);
  // eslint-disable-next-line
  const [IsLoggedIn, SetIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        SetIsLoggedIn(true);
      } else {
        SetIsLoggedIn(false);
      }
      setInit(true);
    });
  });
  return (
    <>
      {init ? <AppRouter IsLoggedIn={IsLoggedIn} /> : "Initializing,,,"}
      <footer>&copy; {new Date().getFullYear()} Switter</footer>
    </>
  );
}

export default App;
