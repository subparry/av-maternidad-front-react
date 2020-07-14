import React from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "../Landing";
import AdminSection from "../AdminSection";
import ArticleLanding from "../ArticleLanding";

const Routes = () => {
  return (
    <Switch>
      <Route path="/admin" exact component={AdminSection} />
      <Route path="/" exact component={Landing} />
      <Route path="/articulo/:id" exact component={ArticleLanding} />
    </Switch>
  );
};

export default Routes;
