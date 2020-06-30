import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { register } from '../actions';
import { connect } from 'react-redux';

class RegisterForm extends React.Component {
	renderErrors({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}
	renderSubmissionError({ error }) {
		if (error) {
			return <div className="ui error message">{error}</div>;
		} else {
			return null;
		}
	}
	renderInput = ({ input, label, type, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<div>
					<input {...input} placeholder={label} type={type} />
				</div>
				{this.renderErrors(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		this.props.register(formValues);
	};
	render() {
		return (
			<form
				className="ui form error"
				onSubmit={this.props.handleSubmit(this.onSubmit)}
			>
				<Field
					name="name"
					type="text"
					component={this.renderInput}
					label="Username"
				></Field>
				<Field
					name="number"
					type="text"
					component={this.renderInput}
					label="Phone Number"
				></Field>
				<Field
					name="password"
					type="password"
					component={this.renderInput}
					label="Password"
				></Field>
				<button className="ui button primary" disabled={this.props.submitting}>
					Register
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
	if (!formValues.name) {
		errors.name = 'You must enter a username';
	}
	if (!formValues.password) {
		errors.password = 'You must enter a password';
	}
	if (!formValues.number) {
		errors.number = 'You must enter a phone number';
	}

	return errors;
};

const mapStateToProps = (state) => {
	return { error: state.validate };
};

RegisterForm = connect(mapStateToProps, { register })(RegisterForm);

export default reduxForm({ form: 'registerForm', validate })(RegisterForm);
