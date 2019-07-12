import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs } from 'react-materialize';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";
import './pages.scss';

class PageJson extends Component {
	
     constructor(props) {
        super(props);
        
        // reset login status
        this.state = {
			tenantId: '1',
			json: '',
			jsonEditor: '',
            pageJson:this.props.pageJson
        };
		
     this.jsonValue = this.jsonValue.bind(this);   
     this.handleSubmit = this.handleSubmit.bind(this);
	  
    }
	
	jsonValue(e, data) {
		// console.log("Json: " + e.plainText);
		//alert(JSON.stringify(e.json));
        this.setState({ 
          json: e.json
        });
		
      }	
	
	
	handleSubmit(e) {
		
        e.preventDefault();
               
        if (this.state.json) {
			this.props.updatePage(this.state.json,this.props.pageId);
			
        }
		
    }	
	
	
	
  componentDidMount() {
	  	 	  
	this.state = {
			tenantId: '1',
			json: '',
			jsonEditor: '',
            pageJson:this.props.pageJson
        };
	
		 
  }
  

	
	componentWillReceiveProps(nextProps) {
	 this.state = {
			tenantId: '1',
			json: '',
			jsonEditor: '',
            pageJson:nextProps.pageJson
        };
	}	
	

	renderAlert() {
		if (this.props.pageStatus) {
		  return (
			<div className="alert alert-danger">
			  <strong>{this.props.pageStatus}</strong> 
			</div>
		  );
		}
	  }	
	
	
	   render() {
        
	   	
			//alert(JSON.stringify(this.props.pageJson));
			 return ( 
			    
				<Tabs className='tab-demo z-depth-1'>
					   <Tab disabled={true} active>
						   <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
									<Row className="margin">
										<Col className="input-field p-0" s={12}>
											<JSONInput
												placeholder={this.state.pageJson} // data to display
												theme="light_mitsuketa_tribute"
												id='json_content'
												locale={locale}
												onChange={this.jsonValue}
												height="440px"
												width="500px"
												onKeyPressUpdate={false}
												viewOnly={true}
											/>
										</Col>
									</Row>
							</div></Tab>
							
				   </Tabs>
               
			 );
				
	   }
	
   

}


export default PageJson;
