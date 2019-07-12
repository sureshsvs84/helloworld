import React, { Component } from 'react';
class DeleteGridRow extends Component {
    selectedRow = () => {
        this.props.editAction(this.props.data);
    };
    render() {
        return (
            <a className="orgIcon" onClick={this.selectedRow}><i className="material-icons" title='Delete'>delete</i></a>
        );
    }
}
export default DeleteGridRow;