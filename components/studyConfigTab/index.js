import StudyConfigTab  from './studyConfigTab';
import {SaveStudyConfig} from  '../../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                SaveStudyConfig
            },
            dispatch
        )
    };
};

export default connect(null, mapDispatchToProps)(StudyConfigTab);
