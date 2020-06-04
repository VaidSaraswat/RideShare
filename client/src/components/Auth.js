import React from "react";
import { connect } from "react-redux";
import history from "../history";
import { signOut } from "../actions";
class Auth extends React.Component {
  renderLoginPage = () => {
    this.props.signOut(this.props.refreshToken);
    history.push("/");
  };
  renderAuthButton() {
    if (this.props.isSignedIn === null || !this.props.isSignedIn) {
      return null;
    } else {
      return (
        <button className="ui red button" onClick={this.renderLoginPage}>
          Sign Out
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
