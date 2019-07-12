import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';

class FunctionsTab extends Component {
    componentDidMount() {
        //Fetch data needed by the component by raising an action
    }
    componentWillUnmount() {
        // 1.check whether changes are compeleted 
        // 2.alert the user that unsaved data will be lost if they have any uncompeleted changes
    }
    render() {
        return (
            <div className="switch mb-3 mt-3">
                <div><Col s={6}>Intake</Col>
                    <label> Off <input type="checkbox" disabled={true} /> <span class="lever" /> On </label></div>
                <div><Col s={6}>Case management</Col>
                    <label> Off <input type="checkbox" disabled={true} /> <span class="lever" /> On </label></div>
                <div><Col s={6}>Service tracking</Col>
                    <label> Off <input type="checkbox" disabled={true} /> <span class="lever" /> On </label></div>
                <div><Col s={6}>Case assignment - View</Col>
                    <label> Off <input type="checkbox" disabled={true} /> <span class="lever" /> On </label></div>
                <div><Col s={6}>Case assignment - Edit</Col>
                    <label> Off <input type="checkbox" disabled={true} /> <span class="lever" /> On </label></div>
                <div><Col s={6}>User management</Col>
                    <label> Off <input type="checkbox" disabled={true} /> <span class="lever" /> On </label></div>
            </div>
        )
    }
}
export default FunctionsTab;