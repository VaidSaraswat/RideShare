import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
const Header = () => {
  return (
    <div className="ui menu">
      <Link to="/" className="header item">
        RideShare
      </Link>
      <Link to="/addride" className="header item">
        Add Ride
      </Link>
      <Link to="/addreview" className="header item">
        Add Review
      </Link>
      <Link to="/drivers" className="header item">
        Drivers
      </Link>
      <Link to="/myprofile" className="header item">
        My Account
      </Link>
      <div className="right menu">
        <Auth />
      </div>
    </div>
  );
};

export default Header;
