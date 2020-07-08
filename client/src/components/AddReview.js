import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addReview } from '../actions';

class AddReview extends React.Component {
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
	onSubmit = (formValues) => {
		this.props.addReview(formValues, this.props.user, this.props.auth);
	};
	render() {
		return (
			<form
				className="ui form error"
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				autoComplete="no"
			>
				<h4 className="ui dividing header">Review Information</h4>
				<Field
					name="driverName"
					type="text"
					component={this.renderInput}
					label="Driver Name"
				></Field>
				<Field
					name="comment"
					type="text"
					component={this.renderInput}
					label="Comment"
				></Field>
				<button className="ui button primary" disabled={this.props.submitting}>
					Add
				</button>
				<button
					className="ui button"
					disabled={this.props.pristine || this.props.submitting}
					onClick={this.props.reset}
				>
					Cancel
				</button>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return { error: state.validate, auth: state.auth, user: state.user };
};

const validate = (formValues) => {
	const errors = {};
	if (!formValues.driverName) {
		errors.driverName = 'You must enter a driver name';
	}
	if (!formValues.comment) {
		errors.comment = 'You must enter a comment';
	}
	return errors;
};

AddReview = connect(mapStateToProps, { addReview })(AddReview);
export default reduxForm({ form: 'addReviewForm', validate })(AddReview);
