import React, { Component, Fragment } from "react";
import { Input, Button, Modal } from 'react-materialize';
import uuid from 'uuid';

class FormModal extends Component {
    constructor(props){
        super(props);
        this.state={
            orgName:'',
            locName:'',
            parenOfLoc:{
              value:''
            },
            newOrg:0,
            orgsList:[],
    }
  }
  componentWillReceiveProps(props){
    if(props.orgsList !== undefined && props.selectedOrganisation !== undefined && props.selectedLocation !== undefined){
      this.setState({
      orgsList : props.orgsList,
      selectedOrganisation: props.selectedOrganisation,
      selectedLocation : props.selectedLocation,
    })
  }
  }

    _input =(e)=>{
      if(e.target.name === "parenOfLoc"){ 
        let data =  this.props.orgsList.filter(item =>{
          return   (item.id == e.target.value) ? item : null ;
          });
          this.setState({
            parenOfLoc : data[0]
        })
      }
     
      else{
        this.setState({
          [e.target.name] :e.target.value
      })
      }
    
//       let locList=[];
//       this.props.orgsList.map((item,i)=>{
//         if(item.id == this.props.selectedOrganisation.id){
//           console.log('org')
//         locList = [...locList, item];
//       }
//       if(item.ttoId == this.props.selectedOrganisation.id ){

//         locList = [...locList, item];
//       }
//       })
// this.setState({
//   locList
// })
    };

    _handleClose = () =>{
        this.setState({
          orgName:'',
          locName:'',
          parenOfLoc:{
            value:''
          },
        });
        this.props.handleModalClose(this.props.name)
    };
    _handleOrg = () => {
        let newOrg = {};
        if (this.state.orgName !== '') {
          newOrg.id = uuid.v4();
          newOrg.level = 0;
          newOrg.name = this.state.orgName;
          newOrg.tenantId = this.props.tenantId;
          newOrg.ttoId = null;
          newOrg.parentId = null;
          newOrg.roles=[];
          newOrg.functions={};
          newOrg.userId = this.props.userId;
          newOrg.statusFlag='new';


          let isDuplicate = this.props.orgsList.map((iteratedValue) => {
            if (iteratedValue.name === this.state.orgName) {
              return true
            }
          });
          if (isDuplicate.includes(true) )  {
                window.Materialize.toast('Organization already exists', 5000)
          } 
          else {
            let allOrganisations ={...this.props.allOrganisations, ...{[newOrg.id]: {...newOrg}}};
            let orgsList =[...this.state.orgsList,{...newOrg}];
            this.setState({ 
              orgName:'',
              newOrg : this.state.newOrg+1 ,
              parenOfLoc:{
                value:''
              },
         });
         let allLocations = {};
         let newLoc = {id:""};
         this.props.actions.SaveOrganization(newOrg.tenantId, newOrg);
         this.props.setValues('selectedOrganisation', newOrg);
         this.props.setValues('selectedLocation', newLoc);
         this.props.setValues('allOrganisations',allOrganisations);
         this.props.setValues('allLocations',allLocations);
         this.props.setValues('orgsList', orgsList);
         this.props.handleModalClose(this.props.name)
          }
        }
      };
      _handleLoc = () => {
        
        let newLoc = {};
        if (this.state.locName !== '') {
            newLoc.id = uuid.v4();
            newLoc.level = this.state.parenOfLoc.level + 1;
            newLoc.parentId = this.state.parenOfLoc.id;
            newLoc.ttoId = this.state.parenOfLoc.ttoId == null ? this.state.parenOfLoc.id : this.state.parenOfLoc.ttoId;
            newLoc.name = this.state.locName;
            newLoc.tenantId = this.state.parenOfLoc.tenantId;
            newLoc.enrollmentTargets=[];
            newLoc.raConfig =[];
            newLoc.roles=[];
            newLoc.pages=[];
            newLoc.userId = this.props.userId;
            newLoc.statusFlag= "new";
            const isDuplicatte = this.props.orgsList.map((iteratedValue)=>{
                if(iteratedValue.name === this.state.locName){
                    return true
                }
            });

            if (isDuplicatte.includes(true)) {
                window.Materialize.toast('Location already exists', 5000);
                return false;
            } else if(this.state.parenOfLoc.value !== '') {
              let locParentName = '';
              let allLocations ={...this.props.allLocations, ...{[newLoc.id]: {...newLoc}}};
              let orgsList =[...this.props.orgsList,{...newLoc}];
              Object.keys(allLocations).map(item=>{
                orgsList.map(parent=>{
                  if(parent.id == allLocations[item].parentId)
                  {
                    locParentName = parent.name
                  }
                })
              });
              this.setState({ 
                locName:'',
                parenOfLoc:{
                  value:''
                }
           });
           
           this.props.actions.SaveLocation(newLoc.tenantId, newLoc);
           this.props.setValues('allLocations',allLocations);
           this.props.setValues('selectedLocation',newLoc);
           this.props.setValues('locParentName',locParentName);
           this.props.setValues('orgsList',orgsList);
           this.props.handleModalClose(this.props.name)
            }
            else{
              window.Materialize.toast('select parent for the location', 5000)
            }
        }
    };
 render(){
  this.locList=[];
  if(this.props.selectedOrganisation !== undefined){
  this.props.orgsList.map((item,i)=>{
    if(item.id == this.props.selectedOrganisation.id){
      this.locList = [...this.locList, item];
  }
  if(item.ttoId == this.props.selectedOrganisation.id ){

    this.locList = [...this.locList, item];
  }
  })
}
     return(
         <Modal open={this.props.open} 
                name={this.props.name}  
                header= {this.props.header} 
                handleModalClose={this.props.handleModalClose}
                modalOptions={{dismissible : false}}
                > 
               
                <Input s={12} m={12} l={12} xl={12} 
                        label={(this.props.name == 'addLoc')? 'Add Location' : 'Add Organization' }
                        className='mt-0' 
                        name={(this.props.name == 'addLoc')? "locName" : "orgName"  }  
                        value={(this.props.name == 'addLoc')? this.state.locName : this.state.orgName }
                        onChange={this._input} 
                        required />
                {this.props.name == "addLoc" &&
                   <select name="parenOfLoc" onChange={this._input} value={this.state.parenOfLoc.value}>
                        <option value="" disabled> Select Parent </option>
                        {
                            this.locList.map((data,i)=>{
                              if (data.statusFlag == "new" || data.statusFlag == "modified"
                               || data.statusFlag == undefined) {
                                return <option value={data.id}>{data.name}</option>
                               }
                               else if (data.statusFlag == "delete" || 
                               data.statusFlag == "ignore") {
                                return <option value={data.id} className="hide">deleteed loc</option>
                               }
                              })
                        } 
                   </select> 
                }
                        <div className="col s12 m12 l12 xl12 mt-2">
                                    <Button className="btn_secondary  otherButtonAddDetUpt modalButton mb-2 ml-1" onClick={this._handleClose}>Cancel</Button>
                                    {this.props.name == "addLoc"&&  
                                        <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' 
                                        onClick={this._handleLoc }>Add</Button>
                                    }
                                    { this.props.name =="addOrg"  &&
                                        <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' 
                                        onClick={ this._handleOrg }>Add</Button>
                                    } 
                        </div>
         </Modal>  
      

     )
 }
}

export default FormModal;
