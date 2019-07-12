import PagesTab  from './pagesTab'
import {  SavePages } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                SavePages
            },
            dispatch
        )
    };
};

export default connect(null, mapDispatchToProps)(PagesTab);


