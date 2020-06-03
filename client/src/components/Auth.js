import React from "react";
import { connect } from "react-redux";
import history from "../history";
import { signOut } from "../actions";
class Auth extends React.Component {
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          className="ui red button"
          onClick={() => this.props.signOut(this.props.refreshToken)}
        >
          Sign Out
        </button>
      );
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
  return {
    isSignedIn: state.auth.isSignedIn,
    refreshToken: state.auth.refreshToken,
  };
};

export default connect(mapStateToProps, { signOut })(Auth);
