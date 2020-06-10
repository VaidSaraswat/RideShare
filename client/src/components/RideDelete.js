import React from "react";
import Modal from "./Modal";
import { connect } from "react-redux";
import history from "../history";
import { deleteRide } from "../actions";
import { Link } from "react-router-dom";

class RideDelete extends React.Component {
  renderActions() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteRide(this.props.auth, id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/rides" className="ui button cancel">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    return "Are you sure you want to delete this ride?";
  }

  render() {
    return (
      <Modal
        title="Delete Ride"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { deleteRide })(RideDelete);
