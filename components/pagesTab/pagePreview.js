import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Tab,Tabs,Input,Icon } from 'react-materialize';

class PagePreview extends React.Component {
  constructor(props) {

    super(props);
	
	this.state = {
            submitted: false,
			values: [],
			layout: []
			
    };
   
    
  }

	componentDidMount() {
				
		this.setState({
			layout: this.props.pageJson.layout
		});
			
	}
	
	componentWillReceiveProps(nextProps) {
    
    this.setState({
     
      layout: nextProps.pageJson.layout
    });
  }




  render() {
 
  
  return (
   <div>
     <Row>
	
      
    {this.state.layout.map(value => {
        const { type, label, name } = value;
        
        if (type == 'text') {
           return <div >
             <Input
             s={12}
             label={value.label}
             id={value.name}
             name={value.name}
             type={value.type}
             minLength={value.options.validation.minLength}
             maxLength={value.options.validation.maxLength}
             onChange={this.handleChange}
            /><h6>{value.options.hint}</h6>
            </div>;
        } else if (type == 'radio') {
           return <div >
               <h5>{value.label}</h5>
             {value.options.items.map(itemval => {
               return  <Input name={value.name} type={value.type} defaultValue={itemval.value} label={itemval.label} onChange={this.handleChange}/>
              
               })}
              </div>;
        } else if (type == 'checkbox') {
           return <div >
               <Input s={12} name={value.name} type={value.type} label={value.label} onChange={this.handleChange}/>
               </div>;
        } else if (type == 'email') {
           return <div >
             <Input
             s={12}
             label={value.label}
             id={value.name}
             name={value.name}
             type={value.type}
             onChange={this.handleChange}
            />
            </div>;
        } else if (type == 'select') {
           return <div >
               <Input s={12} name={value.name} type={value.type} label={value.label} defaultValue='' onChange={this.handleChange}>
             {value.options.items.map(itemval => {
               return   <option value={itemval.value}>{itemval.label}</option>
              
               })}
             </Input>
              </div>;
            
        } else if (type == 'date') {
           return <div >
               <Input s={12} type={value.type} label={value.label} format='dd/mm/yyyy' onChange={this.handleChange}>
             
             
             </Input>
              </div>;
            
        }else if (type == 'time') {
           return <div >
               <Input s={12} type={value.type} label={value.label} onChange={this.handleChange}>
             
             
             </Input>
              </div>;
            
        }
        
        
               
    })}
        
    </Row>

		
		</div>
		);


  }
}

export default PagePreview;