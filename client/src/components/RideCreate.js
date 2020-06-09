import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createRide } from "../actions";
import Datepicker from "./Datepicker";
import moment from "moment";

class RideCreate extends React.Component {
  renderSubmissionError({ error }) {
    if (error) {
      return <div className="ui error message">{error}</div>;
    }
  }
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, type, meta }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {this.renderError(meta)}
        </div>
      </div>
    );
  };

  //Need to fix this since we need to change the date even if its initially set
  renderDatePicker = ({ input, label }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <Datepicker {...input} />
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.createRide(formValues, this.props.auth);
  };
  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <h4 className="ui dividing header">Ride Information</h4>
        <div className="four fields">
          <Field
            name="driverName"
            type="text"
            component={this.renderInput}
            label="Username"
          ></Field>
          <Field
            name="driverNumber"
            type="text"
            component={this.renderInput}
            label="Phone Number"
          ></Field>
          <Field
            name="departingLocation"
            type="text"
            component={this.renderInput}
            label="Departing Location"
          ></Field>
          <Field
            name="arrivingLocation"
            type="text"
            component={this.renderInput}
            label="Arriving Location"
          ></Field>
        </div>
        <div className="four fields">
          <Field
            name="departingDate"
            type="text"
            component={this.renderDatePicker}
            label="Departing Date"
            normalize={(value) =>
              value ? moment(value).format("YYYY-MM-DD") : null
            }
          ></Field>
          <Field
            name="dropOffAlong"
            type="text"
            component={this.renderInput}
            label="Drop of Along (yes/no)"
          ></Field>
          <Field
            name="departingTime"
            type="text"
            component={this.renderInput}
            label="Departing Time (HH:MM)"
          ></Field>
          <Field
            name="price"
            type="text"
            component={this.renderInput}
            label="Price"
          ></Field>
        </div>
        <button className="ui button primary" disabled={this.props.submitting}>
          Create
        </button>
        <button
          className="ui button"
          disabled={this.props.pristine || this.props.submitting}
          onClick={this.props.reset}
        >
          Cancel
        </button>
        {this.renderSubmissionError(this.props.error)}
      </form>
    );
  }
}

//  FINISH THIS
const validate = (formValues) => {
  const errors = {};
  if (!formValues.driverName) {
    errors.driverName = "You must enter a username";
  }
  if (!formValues.driverNumber) {
    errors.driverNumber = "You must enter a phone number";
  }
  if (!formValues.departingLocation) {
    errors.departingLocation = "You must enter a departing location";
  }
  if (!formValues.arrivingLocation) {
    errors.arrivingLocation = "You must enter a arriving location";
  }
  if (!formValues.departingTime) {
    errors.departingTime = "You must enter a departing time";
  }
  if (!formValues.price) {
    errors.price = "You must enter a price";
  }
  if (!formValues.dropOffAlong) {
    errors.dropOffAlong = "You must enter yes/no";
  }

  if (!formValues.departingDate) {
    errors.departingDate = "You must enter a date";
  }
  return errors;
};

const mapStateToProps = (state) => {
  return { auth: state.auth, error: state.validate };
};

RideCreate = connect(mapStateToProps, { createRide })(RideCreate);
export default reduxForm({ form: "createRideForm", validate })(RideCreate);
