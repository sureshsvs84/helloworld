import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal,Collapsible,CollapsibleItem } from 'react-materialize';
import elementType from './controls/json/element-type.json'


class AddControl extends Component { 
    constructor(props){
        super(props);
        this.state={
            isModalOpen:flase
        }
    }

    handleTypeChange =(e)=>{
        this.setState({
            controlType :  e.target.value
        })
    };
    
controls =( type)=>{
    switch(type) {

        case 'action-toolbar':
          return (<ActionControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
        case 'address':
          return (<AddressControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
        case 'array':
          return (<ArrayControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
        case 'button':
          return (<ButtonControl mode={this.state.editor} index={idx} data={data} type={type} onChange={this.addClick} update={this.handleSchema}  close={this.handleCloseModal} />); 
        case 'checkbox':
          return (<CheckboxControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
        case 'checkbox-group':
          return (<CheckgroupControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
        case 'date':
          return (<DateControl index={idx} data={data} onChange={this.addClick} mode={this.state.editor}  close={this.handleCloseModal} />);
        case 'email':
          return (<EmailControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
        case 'fieldset':
          return (<FieldsetControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
        case 'heading':
          return (<HeadingControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
        case 'layout-editor':
          return (<LayoutControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
        case 'number':
          return (<NumberControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
        case 'panel':
          return (<PanelControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
        case 'password':
          return (<PasswordControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
        case 'phone':
          return (<PhoneControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
        case 'radio':
          return (<RadioControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
        case 'select':
          return (<SelectControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
        case 'slider':
          return (<SliderControl index={idx} data={data} onChange={this.addClick} mode={this.state.editor}  close={this.handleCloseModal}/>); 			
        case 'slide-toggle':
          return (<SlidertoogleControl index={idx} data={data} onChange={this.addClick} mode={this.state.editor}  close={this.handleCloseModal}/>);
        case 'ssn':
          return (<SsnControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
        case 'states':
          return (<StatesControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
        case 'static':
          return (<StaticControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
        case 'static-panel':
          return (<StaticpanelControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
        case 'text':
          return (<TextControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
        case 'textarea':
          return (<TextareaControl index={idx} data={data} type={type} onChange={this.addClick}   close={this.handleCloseModal} mode={this.state.editor} />); 			
        case 'text-mask':
          return (<TextmaskControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
        case 'time':
          return (<TimeControl index={idx} data={data} type={type} mode={this.state.editor} onChange={this.addClick} close={this.handleCloseModal} />);
        case 'zip':
          return (<ZipControl mode={this.state.editor} index={idx} data={data} type={type} onChange={this.addClick}   close={this.handleCloseModal}/>);
        default:
          return 'No Controls';
    }

};

handleControlSubmit= () =>{
    

};


    render(){
        return(
            <Fragment>
                	<Modal className="modal modal-fixed-footer" header=" Add an Element" open={this.state.isModalOpen} modalOptions={{ dismissible: false }} close={this.handleCloseModal} >
							<button className="modal_close" onClick={this.handleCloseModal}><i class="material-icons " >close</i> </button>
						<Row>
							<Col>
							<form onSubmit={this.handleControlSubmit} >
							 <div className="modal-content">
							   <select defaultValue="" name='type' id='type' onChange={this.handleTypeChange} required s={6}>
								  <option value="" >Choose your option</option>
								  	{elementType.map(itemval => {
									  return <option value={itemval.value}>{itemval.label}</option>
									})}
								</select>
								{
                                    this.controls(this.state.controlType)
                                }
							  </div>
							</form>
							</Col>
						</Row>
						</Modal>
            </Fragment>

        )
    }
}
export default AddControl;