import React from "react";
import { connect } from "react-redux";
import { fetchRides } from "../actions";

class Rides extends React.Component {
  componentDidMount() {
    this.props.fetchRides(this.props.auth);
  }
  render() {
    return <div>Rides</div>;
  }
}

const mapStateToProps = (state) => {
  return { rides: state.rides, auth: state.auth };
};
export default connect(mapStateToProps, { fetchRides })(Rides);
