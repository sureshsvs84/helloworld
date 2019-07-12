import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Col, Button, Preloader } from 'react-materialize';
import logo from "../../../../public/assets/images/logo/materialize-logo.png";
import profileImg from "../../../../public/assets/images/logo/materialize-logo.png";
import './header.scss';
import UserMenu from "../userMenu";
import { Link } from 'react-router-dom';
import { format } from "util";
import {BACKEND_URL } from '../../../config';
import { authHeaderFinal } from '../../../helpers';
import axios from "axios";
import uuid from 'uuid';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isdropDownOpen: false,
            selectedFile: '',
            preloader:false
        };
    }
    // componentDidMount =() =>{
    //   //this.environment = localStorage.getItem("env")   
    // }
    toggleProfileDropDown = () => {
        this.setState({ isdropDownOpen: !this.state.isdropDownOpen });
    };
    handleImport = (e) => {
        this.refs.fileUpload.click();
    };
	handleClick= (e) =>{
    };
    onChangFile =(e) =>{
        e.stopPropagation();
        e.preventDefault();
        let file = e.target.files[0];
        this.setState({selectedFile: file ,preloader:true});
        let uploadJson = this.readUploadedFileAsText(file);
        const generatedId = uuid.v4();
        let userId = this.props.userId;
        let newProps = this.props;
        let newThis = this
        let uploadedJson;
        if (file !== undefined) {
            uploadJson.then(function(value) {
                try{
                    uploadedJson = JSON.parse(value);
                    uploadedJson.userId = userId;
                    uploadedJson.id = generatedId;
                    axios.post(`${BACKEND_URL}/validate`, uploadedJson, { headers: authHeaderFinal() }). then(response => {
                        if (response.status === 200) {
                            newProps.actions.fetchSavedTenants()
                                
                                alert(response.data.messages ? response.data.messages : response.statusText)
                                newThis.setState({selectedFile: '', preloader: false});
                        }else{
                            alert(response.data.messages ? response.data.messages : response.statusText)
                            newThis.setState({selectedFile: '', preloader: false});
                        }
                    }).catch(error =>{
                        alert(error.response.data)
                        newThis.setState({selectedFile: '', preloader: false});
                    })
                }catch(e){
                    alert("Import failed due to an invalid file type or syntax errors in the file. The file must be of JSON type and with no syntax errors");
                    newThis.setState({selectedFile: '', preloader: false});
                }    
            })   
        }else{
            newThis.setState({selectedFile: '', preloader: false});
        }
    };

    readUploadedFileAsText = (inputFile) => {
        if (inputFile !== undefined) {
            const temporaryFileReader = new FileReader();
      
        return new Promise((resolve, reject) => {
          temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
          };
      
          temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
          };
          temporaryFileReader.readAsText(inputFile);
        });   
        }else{
            this.setState({selectedFile: '', preloader: false});
        }
      };


    render() {
        const env = localStorage.getItem("env");
        var homeLink = '';
        var createLink = '';
        var importButton = '';
        var profileButton = '';
        var userMenu = '';
        //var env= this.props.environment;

        if (this.props.tokenStatus == true) {
            homeLink = <Link to={"/dashboard"} onClick={this.handleClick} className="pl-2" name="VIEW">{"Home"}</Link>;
            createLink = <Link to={"/createProject"} onClick={this.handleClick} className="pl-2" name="CREATE">{"Create"}</Link>;
            importButton = <Button  onClick={this.handleImport} className=" imporButton">{"Import Project(s)"}
            <input type="file" className="hide" ref="fileUpload" onChange={this.onChangFile} accept=".json" ></input>
            </Button>;
            profileButton =                  
                <Link to="/signout" className="grey-text text-lighten-5" onClick={this.toggleProfileDropDown} >
                <i className="material-icons" title='Logout' style={{position: "absolute",top: "0",left: "97%"}} >exit_to_app</i>
                </Link>
                
            // userMenu = <UserMenu isprofileDropDown={this.state.isdropDownOpen} toggleProfileDropDown={this.toggleProfileDropDown} />
        }

        return (
            <Fragment>
                 <Col s={12} className={this.state.preloader ? "valign-wrapper leftzero loader-overlay-view" : "hide"}>
            <Preloader className="spinner" size='big' active={this.state.preloader} />
          </Col>
                <header id="header" className="page-topbar">
                    <Col className="navbar-fixed">
                        <nav className="navbar-color">
                            <Col className="nav-wrapper">
                                <span className="header-nav">
                                    <a to="/dashboard" className="mpr-logo">
                                        <img src={logo} alt="logo" /> RAPTER
                                    </a>
                                    {homeLink}{createLink}{importButton}
                                </span>
                                {this.props.authStatus? 
                                    <label className="white-text" style = {{float: "right",marginRight: "62px" }} title ={"Environment"}>{env}</label> :null
                                }
                                {profileButton} 
                               
                            </Col>
                        </nav>
                    </Col>
                </header>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error, authStatus: state.auth.authenticated, tokenStatus: state.auth.tokenverified, environment: state.auth.environment };
}

export default connect(mapStateToProps)(Header);
