import FunctionsTab  from './functionsTab'
import { SaveFunctions} from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                SaveFunctions
            },
            dispatch
        )
    };
};

export default connect(null, mapDispatchToProps)(FunctionsTab);


