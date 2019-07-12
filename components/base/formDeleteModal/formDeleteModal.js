import React, { Component, Fragment } from "react";
import { Input, Button, Modal } from 'react-materialize';

class FormDeleteModal extends Component {
    constructor(props){
        super(props);
        this.state={
          selectedOrganisation:{
            name:'',
            statusFlag:''
          },
          selectedLocation:{
            name:'',
            statusFlag:''
          },
           
    }
  
  }
  componentWillReceiveProps(props){
    
    this.setState({
      orgsList : props.orgsList,
      selectedOrganisation: props.selectedOrganisation,
      selectedLocation : props.selectedLocation,
      locdel :props.selectedLocation !== undefined ?  props.selectedLocation.statusFlag : '',
      orgdel :props.selectedOrganisation !== undefined ? props.selectedOrganisation.statusFlag :''

    })
  }

    _handleClose = () =>{
        this.props.handleModalClose(this.props.name)
    };
    _handleOrg = () => {
        let newOrg = {
          ...this.state.selectedOrganisation,
          userId : this.props.userId,
          statusFlag :  this.state.orgdel =="new" ? "ignore" :"delete"
        };
       
            let arrIndex='';
            let allOrganisations ={...this.props.allOrganisations};
            delete  allOrganisations[this.state.selectedOrganisation.id];
            let orgsList =this.props.orgsList;
            orgsList.map((item,i)=>{
                if(item.id == this.state.selectedOrganisation.id){
                    arrIndex = i;
                  }
            });
            orgsList.splice(arrIndex,1);
            this.setState({ 
              selectedOrganisation:{
                id:'',
                name:''
              }
         });
         let selectedOrganisation = {
           id : ''
         };
         this.props.setValues('selectedOrganisation',selectedOrganisation);
         this.props.actions.SaveOrganization(newOrg.tenantId, newOrg);
         this.props.setValues('allOrganisations',allOrganisations);
         this.props.setValues('orgsList', orgsList);
         this.props.handleModalClose(this.props.name)

          };
      
      _handleLoc = () => {
              let newLoc = {
                ...this.state.selectedLocation,
                userId : this.props.userId,
              statusFlag : this.state.locdel == "new" ? 'ignore' : 'delete'
            };
              let arrIndex='';           
              let allLocations ={...this.props.allLocations};
              delete allLocations[this.state.selectedLocation.id];
              let orgsList =this.props.orgsList;
                  orgsList.map((item,i)=>{
                    if(item.id == this.state.selectedLocation.id){
                      arrIndex = i;
                    }
                  });
                  orgsList.splice(arrIndex,1);
                  this.setState({
                    selectedLocation:{
                      id:'',
                      name:''
                    }
                  });
                 let selectedLocation = {
                   id:''
                 };
           this.props.actions.SaveLocation(newLoc.tenantId, newLoc);
           this.props.setValues('allLocations',allLocations);
           this.props.setValues('selectedLocation',selectedLocation);
           this.props.setValues('orgsList',orgsList);
           this.props.handleModalClose(this.props.name)
            };
        
 render(){
     return(
         <Modal open={this.props.open} 
                name={this.props.name}  
                header= {this.props.header}
                handleModalClose={this.props.handleModalClose}
                modalOptions={{dismissible : false}}
                > 
                <h6> delete  {(this.props.name == 'deleteLoc')? this.state.selectedLocation.name : this.state.selectedOrganisation.name } ?</h6>
                       
                       
                        <div className="col s12 m12 l12 xl12">
                                    <Button className="btn_secondary  otherButtonAddDetUpt modalButton mb-2 ml-1" onClick={this._handleClose}>Cancel</Button>
                                    {this.props.name == "deleteLoc"&&  
                                        <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' 
                                        onClick={this._handleLoc }>Delete</Button>
                                    }
                                    { this.props.name =="deleteOrg"  &&
                                        <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' 
                                        onClick={ this._handleOrg }>Delete</Button>
                                    } 
                        </div>
                    
         </Modal>  
      

     )
 }
}

export default FormDeleteModal;