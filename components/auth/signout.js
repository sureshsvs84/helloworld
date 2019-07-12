import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import * as actions from '../../actions';
import { Link, withRouter } from 'react-router-dom';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
	this.props.history.push('/signin')
  }

  render() {
    return (<div>Sorry to see you go...<Link to="/signin" className="grey-text text-darken-1"> Signin Again  </Link></div>
	
	 
	);
  }
}

export default connect(null, actions)(Signout);
