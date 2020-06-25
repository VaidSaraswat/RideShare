import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchRide, editRide } from '../actions';
import moment from 'moment';

class RideEdit extends React.Component {
	componentDidMount() {
		this.props.fetchRide(this.props.match.params.id, this.props.auth);
		this.props.initialize({ ...this.props.initialValues });
	}
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
					<input {...input} type={type} placeholder={label} />
					{this.renderError(meta)}
				</div>
			</div>
		);
	};

	onSubmit = (formValues) => {
		this.props.editRide(
			formValues,
			this.props.auth,
			this.props.match.params.id
		);
	};
	render() {
		return (
			<form
				className="ui form error"
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				autoComplete="off"
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
						type="date"
						component={this.renderInput}
						label="Departing Date"
						normalize={(value) =>
							value ? moment(value).format('YYYY-MM-DD') : null
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
					Edit
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

const validate = (formValues) => {
	const errors = {};
	if (!formValues.driverName) {
		errors.driverName = 'You must enter a username';
	}
	if (!formValues.driverNumber) {
		errors.driverNumber = 'You must enter a phone number';
	}
	if (!formValues.departingLocation) {
		errors.departingLocation = 'You must enter a departing location';
	}
	if (!formValues.arrivingLocation) {
		errors.arrivingLocation = 'You must enter a arriving location';
	}
	if (!formValues.departingTime) {
		errors.departingTime = 'You must enter a departing time';
	}
	if (!formValues.price) {
		errors.price = 'You must enter a price';
	}
	if (!formValues.dropOffAlong) {
		errors.dropOffAlong = 'You must enter yes/no';
	}

	if (!formValues.departingDate) {
		errors.departingDate = 'You must enter a date';
	}
	return errors;
};

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: {
			driverName: state.rides[`${ownProps.match.params.id}`].driverName,
			driverNumber: state.rides[`${ownProps.match.params.id}`].driverNumber,
			departingLocation:
				state.rides[`${ownProps.match.params.id}`].departingLocation,
			arrivingLocation:
				state.rides[`${ownProps.match.params.id}`].arrivingLocation,
			departingDate: moment(
				state.rides[`${ownProps.match.params.id}`].departingDate
			).format('YYYY-MM-DD'),
			dropOffAlong: state.rides[`${ownProps.match.params.id}`].dropOffAlong,
			departingTime: state.rides[`${ownProps.match.params.id}`].departingTime,
			price: state.rides[`${ownProps.match.params.id}`].price,
		},
		auth: state.auth,
		error: state.validate,
	};
};

RideEdit = connect(mapStateToProps, { fetchRide, editRide })(RideEdit);
export default reduxForm({
	form: 'editRideForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(RideEdit);
