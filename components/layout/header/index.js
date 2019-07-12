import Header from "./header";
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchSavedTenants} from '../../../actions/index';

const mapStateToProps=(state)=>{
    return{
        authentication: state.auth.authenticated,
        userId : state.projectList.userId
    }
};

const mapDispatchToProps =(dispatch) =>{
    return{
        actions:bindActionCreators({
            fetchSavedTenants
            },dispatch
        ) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);