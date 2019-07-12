import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tab,Tabs } from 'react-materialize';
import brand from '../../../public/assets/images/logo/login-logo.png';
import * as actions from '../../actions';

class Angular extends Component {
	
	constructor(props){
    super(props);
    this.state = {username:'default-username', password:'default-password'}
	
  }

  componentDidMount() {
	  //this.props.history.push('/dashboard');
	  
    this.nv.addEventListener("login", this.handleNvEnter);
	
	fetch('/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }
  
  componentWillUnmount() {
    this.nv.removeEventListener("login", this.handleNvEnter);
  }

  handleNvEnter = (event) => {
    this.setState({ username: event.detail.username, password: event.detail.password })
  };
	
	
	render() {
		const { username } = this.state;
    return (
	   
      <div className="App">
        <header className="App-header">
          
          <h4 className="App-title">Angular Dynamic Data Forms Integration</h4>
		  
		  <div>
       
        
      </div>
        </header>
         
        
          
      </div>
        );
      }


  
  

}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authStatus: state.auth.authenticated, tokenStatus: state.auth.tokenverified };
}

export default connect(mapStateToProps, actions)(Angular);
