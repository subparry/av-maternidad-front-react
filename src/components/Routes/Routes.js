import React from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "../Landing";
import AdminSection from "../AdminSection";

const Routes = () => {
  return (
    <Switch>
      <Route path="/admin" exact component={AdminSection} />
      <Route path="/" exact component={Landing} />
    </Switch>
  );
};

export default Routes;
