import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signup extends Component {
  renderField({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <div className="form-group">
        <label>{label}:</label>
        <input
          className="form-control"
          {...input}
          placeholder={label}
          type={type}
        />
        {touched &&
          (error && (
            <span className="text-danger">
              <small>{error}</small>
            </span>
          ))}
      </div>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  handleFormSubmit(formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps);
  }
  render() {
    const {
      handleSubmit,
      fields: { username, email, password, passwordConfirm }
    } = this.props;
    return (
      <form
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        className="col-md-4"
      >
        <Field
          label="Username"
          name="username"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        <Field
          label="Password Confirmation"
          name="passwordConfirm"
          type="password"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-dark">
          Sign up
        </button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.username) {
    errors.username = 'Username is required';
  }
  if (!formProps.email) {
    errors.email = 'Email is Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)
  ) {
    errors.email = 'Invalid email address';
  }
  if (!formProps.password) {
    errors.password = 'Password is required';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Password confirmation is required';
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = reduxForm({
  form: 'signup',
  fields: ['username', 'email', 'password', 'passwordConfirm'],
  validate
})(Signup);

export default connect(mapStateToProps, actions)(Signup);
