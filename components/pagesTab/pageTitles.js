import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal,Collapsible,CollapsibleItem } from 'react-materialize';


class PagesTitles extends Component { 
constructor(props){
    super(props);
    this.state ={
        key:'',
        collection:'',
        title:'',
        subtitle:''

    }
}
_handleChange = (e)=>{
    this.setState({
        [e.target.name] : e.target.value
    })

};
componentDidMount(){
    this.setState({
        key:this.props.pageJson.key,
        collection:this.props.pageJson.collection,
        title:this.props.pageJson.collection,
        subtitle:this.props.pageJson.subtitle
    })
}
render(){
    return(
        <Fragment>
            <Row>
                <Col s={12}>
                <Input s={6} type='text'  className="labelText" label="key" name="key" value={this.state.key} onChange={this._handleChange} />
                <Input s= {6} type='text'  className="labelText" label="collection" name="collection" value={this.state.collection} onChange={this._handleChange} />
                </Col>
                <Col s={12}>
                <Input s={6} type='text'  className="labelText" label="title" name="title" value={this.state.title} onChange={this._handleChange} />
                 <Input s={6} type='text'  className="labelText" label="subtitle" name="subtitle" value={this.state.subtitle} onChange={this._handleChange} />
                </Col>
            </Row>
            
            
        </Fragment>
    );
}

}
export default PagesTitles;

