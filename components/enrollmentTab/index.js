import EnrollmentTab  from './enrollmentTab'
import { SaveEnrollment} from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                SaveEnrollment
            },
            dispatch
        )
    };
};

export default connect(null, mapDispatchToProps)(EnrollmentTab);
