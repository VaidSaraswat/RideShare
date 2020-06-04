import React from "react";
import { connect } from "react-redux";
import { fetchRides } from "../actions";

class RidesList extends React.Component {
  componentDidMount() {
    this.props.fetchRides(this.props.auth);
  }

  parseTime(date) {
    let dt = new Date(date);
    let h = dt.getHours(),
      m = dt.getMinutes();
    let time = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + " AM";
    return time;
  }
  parseDate(date) {
    let formattedDate = new Date(date);
    return formattedDate.toDateString();
  }
  renderList() {
    return this.props.rides.map((ride) => {
      return (
        <div className="ui segment" key={ride._id}>
          <div className="ui grid">
            <div className="left floated six wide column">
              <i className="large calendar alternate icon"></i>
              {this.parseDate(ride.departingDate)}
            </div>
            <div className="right floated right aligned eight wide column">
              <i className="large user circle icon"></i>
              {ride.driverName}
            </div>
            <div className="four wide column">
              Departing Location: {ride.departingLocation}
            </div>
            <div className="four wide column">
              Arriving Location: {ride.arrivingLocation}
            </div>
            <div className="four wide column">
              Departing Time: {this.parseTime(ride.departingDate)}
            </div>
            <div className="four wide column">Price: ${ride.price}</div>
            <div className="four wide column">
              Driver Number: {ride.driverNumber}
            </div>
            <div className="four wide column">
              Drop Off Along: {ride.dropOffAlong ? "yes" : "no"}
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div className="ui segments">{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { rides: Object.values(state.rides), auth: state.auth };
};
export default connect(mapStateToProps, { fetchRides })(RidesList);
