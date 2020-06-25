import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { signIn } from '../actions';
import { connect } from 'react-redux';
class LoginForm extends React.Component {
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
		this.props.signIn(formValues);
	};

	render() {
		return (
			<form
				className="ui form error"
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				autoComplete="no"
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
					<button
						className="ui button primary"
						disabled={this.props.submitting}
					>
						Log In
					</button>
					<button
						className="ui button"
						disabled={this.props.pristine || this.props.submitting}
						onClick={this.props.reset}
					>
						Cancel
					</button>
				</div>
				{this.renderSubmissionError(this.props.auth)}
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

	return errors;
};
const mapStateToProps = (state) => {
	return { auth: state.validate };
};
LoginForm = connect(mapStateToProps, { signIn })(LoginForm);

export default reduxForm({ form: 'loginForm', validate })(LoginForm);
