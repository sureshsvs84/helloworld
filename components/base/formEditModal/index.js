import FormEditModal from './formEditModal'
import { SaveOrganization, SaveLocation} from '../../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                SaveOrganization,
                SaveLocation
            },
            dispatch
        )
    };
};

export default connect(null, mapDispatchToProps)(FormEditModal);


