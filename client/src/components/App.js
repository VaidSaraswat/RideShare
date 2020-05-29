import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Rides from "./Rides";
import AddReview from "./AddReview";
import Drivers from "./Drivers";
import Account from "./Account";
import Auth from "./Auth";
import AddRide from "./AddRide";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={Rides}></Route>
          <Route path="/addride" exact component={AddRide}></Route>
          <Route path="/addreview" exact component={AddReview}></Route>
          <Route path="/drivers" exact component={Drivers}></Route>
          <Route path="/myprofile" exact component={Account}></Route>
          <Route path="/login" exact component={Auth}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
