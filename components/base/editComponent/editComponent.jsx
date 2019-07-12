import React, { Component } from 'react';

class EditComponent extends Component {
    selectedRow = () => {
        this.props.editAction(this.props.data);
    };
    render() {
        return (
            <a className="orgIcon" onClick={this.selectedRow}><i className="material-icons" title='Edit'>edit</i></a>
        );
    }
}
export default EditComponent;