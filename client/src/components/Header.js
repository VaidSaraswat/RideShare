import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="ui menu">
      <Link to="/" className="header item">
        RideShare
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
      <Link to="/login" className=" right header item">
        Login
      </Link>
    </div>
  );
};

export default Header;
