import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const AppRouter = ({ IsLoggedIn }) => {
  return (
    <Router>
      {IsLoggedIn && <Navigation />}
      <Switch>
        {IsLoggedIn ? (
          <>
            <Route>
              <Home />
            </Route>
          </>
        ) : (
          <Route>
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
