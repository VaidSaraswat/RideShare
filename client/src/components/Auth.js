import React from "react";
import { connect } from "react-redux";
import history from "../history";
class Auth extends React.Component {
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return <button className="ui red google button">Sign Out</button>;
    } else {
      return (
        <button
          className="ui blue button"
          onClick={() => history.push("/login")}
        >
          Sign in
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(Auth);
