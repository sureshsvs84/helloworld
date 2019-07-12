import React, { Component } from 'react';
import { Row, Col, Card, Tab, Tabs, Input, Icon } from 'react-materialize';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class Sms extends Component {
	
  constructor(props) {
	 
    super(props);
	this.props.twoStepGeneration();
    //this.state = {
    //  token: otplib.authenticator.generate(secret)
    //};

  }
  
  componentDidMount() {
	
    /*this.intervalID = setInterval(
      () => this.fetchOtp(),
      10000
    );*/
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }  
  
 fetchOtp() {
    this.props.twoStepGeneration();
    //this.setState({
    //  token: otplib.authenticator.generate(secret)
    //});
  } 
 
  render() {
    return (
      <span className="App-clock"></span>
    );
  }

}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authStatus: state.auth.authenticated, tokenStatus: state.auth.tokenverified };
}

export default connect(mapStateToProps, actions)(Sms);

