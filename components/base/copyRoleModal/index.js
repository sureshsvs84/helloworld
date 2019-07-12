import CopyRoleModal from './copyRoleModal';
import { fetchSingleTenant, fetchAllTenants,fetchSavedTenants } from '../../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



const mapStateToProps=(state)=>{
    return{
        projectList : state.projectList.Projects,
      
    }
};
const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                fetchSingleTenant,
                fetchAllTenants,
                fetchSavedTenants
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyRoleModal);

