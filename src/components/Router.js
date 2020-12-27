import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ({ IsLoggedIn }) => {
  return (
    <Router>
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
