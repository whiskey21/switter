import React, { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  // eslint-disable-next-line
  const [init, initState] = useState(false);
  // eslint-disable-next-line
  const [IsLoggedIn, SetIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter IsLoggedIn={IsLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Switter</footer>
    </>
  );
}

export default App;
