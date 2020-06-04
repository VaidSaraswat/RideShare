import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Rides from "./Rides";
import AddReview from "./AddReview";
import Drivers from "./Drivers";
import LoginForm from "./LoginForm";
import Account from "./Account";
import AddRide from "./AddRide";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={LoginForm}></Route>
          <Route path="/addride" exact component={AddRide}></Route>
          <Route path="/addreview" exact component={AddReview}></Route>
          <Route path="/drivers" exact component={Drivers}></Route>
          <Route path="/myprofile" exact component={Account}></Route>
          <Route path="/rides" exact component={Rides}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
