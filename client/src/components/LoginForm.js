import React from "react";
import { Field, reduxForm } from "redux-form";
import { signIn } from "../actions";
import { connect } from "react-redux";

class LoginForm extends React.Component {
  renderInput = ({ input, label, type, meta: { touched, error } }) => (
    <div className="field">
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
      </div>
    </div>
  );

  onSubmit = (formValues) => {
    this.props.signIn(formValues);
  };

  render() {
    return (
      <form
        className="ui form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="name"
          type="text"
          component={this.renderInput}
          label="Username"
        ></Field>
        <Field
          name="password"
          type="password"
          component={this.renderInput}
          label="Password"
        />
        <div>
          <button className="ui button primary">Log In</button>
          <button className="ui button">Cancel</button>
        </div>
      </form>
    );
  }
}

LoginForm = connect(null, { signIn })(LoginForm);

export default reduxForm({ form: "loginForm" })(LoginForm);
