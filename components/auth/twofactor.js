import React, { Component } from 'react';
import { Row, Col, Card, Tab, Tabs, Input, Icon } from 'react-materialize';
import { connect } from 'react-redux';
import { authHeaderFinal } from "../../helpers";
import * as actions from '../../actions';
import Otp from './otp';
//import Sms from './sms';

class Twofactor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      code: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    if (!this.props.authStatus && !this.props.tokenStatus) {
      this.props.history.push('/signin');
    }
    if (this.props.authStatus == true && this.props.tokenStatus == true) {
      this.props.history.push('/dashboard');
    }

  }



  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleBack = (e) => {
    this.props.signoutUser();
    this.props.history.push('/signin');
  };

  handleSubmit(e) {
    e.preventDefault();
    const { code } = this.state;
    if (code) {
      this.props.twoStepVerification(code);

    }
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong className="ml-7 errorMessage">{this.props.errorMessage}</strong>
        </div>
      );
    }
  }

  componentWillReceiveProps(newProps) {

    // redirect to feature branch if auth status is true
    if (newProps.authStatus == true && newProps.tokenStatus == true) {
      console.log(authHeaderFinal())
      this.props.history.push('/dashboard')

    }
  }

  render() {


    const { code } = this.state;

    return (
      <Row id="login-page" className="input-field ml-10" >
        <Col className="col s8 z-depth-4 ml-10 mr-3" >
          <form className="login-form" onSubmit={this.handleSubmit} >
            <Row>
              <Col className="input-field ml-10 center" s={8}>
                <p className="center login-form-text"><Otp {...this.props} /></p>

              </Col>
            </Row>

            <Row className="margin">
              <Col className="input-field p-0" s={12}>

                <Input
                  s={12}
                  label='Enter the verification code received via SMS or Google Authenticator app to verify account'
                  id='code'
                  name='code'
                  type='text'
                  icon='lock_outline'
                  placeholder={"Verification code *"}
                  onChange={this.handleChange}
                  required
                  className="labelText col ml-6 mt-2 s7 pt-2"
                />
                
              </Col>
              {this.renderAlert()}
            </Row>

            <Row >
              {/* <Col className="input-field right mr-2 ">
                <button className="btn btn_primary otherButtonAddDetUpt"  onClick={this.handleBack} type="button" name="action">Back</button> */}

                <button className="btn btn_primary otherButtonAddDetUpt right mr-2" style={{ marginLeft: "10px" }} type="submit" name="action">Verify</button>

              {/* </Col> */}
            </Row>
            <Row className="mb-2">
              <Col className="input-field col s6 m6 l6" s={6} m={6} l={6}>
                <p className="margin medium-small"></p>
              </Col>

            </Row>
          </form>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authStatus: state.auth.authenticated, tokenStatus: state.auth.tokenverified };
}

export default connect(mapStateToProps, actions)(Twofactor);
