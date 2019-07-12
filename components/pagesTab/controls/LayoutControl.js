import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal,Collapsible,CollapsibleItem } from 'react-materialize';



class LayoutControl extends Component {

  constructor(props) {
		super(props);

		this.state = {
			
		};

		
	  this.handleChange = this.handleChange.bind(this);
	  
    }

    componentDidMount() {
     
	  
    }
   
    componentWillReceiveProps(nextProps) {
	  
	 
	}
	
	
	
	handleChange(e) {
		const { onChange } = this.props;
		const { name, value } = e.target;
		//this.setState({ [name]: value }, () => console.log(name, value));
		onChange(e);
    }
	
		


  render() {

		
		return (
			<Collapsible accordion={false}>
				<CollapsibleItem header="Layout" icon="keyboard_arrow_down">
					<div>
						<h5><b>Layout Configuration</b></h5>
					</div>
				</CollapsibleItem>
			</Collapsible>
			);
	 
  }	 
	

}
export default LayoutControl;