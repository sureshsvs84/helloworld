import React, { Component, Fragment } from 'react';
import { Row, Input, Tab, Tabs, Button, Modal, Col } from 'react-materialize';
import LoadingSpinner from './loadingSpinner';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";
import PagePreview from './pagePreview';
import DynamicControls from './dynamicControls';
import uuid from 'uuid';
import './pages.scss';

class PagesTab extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editor: '',
			applicationMode: '',
			selectedPage: '',
			pages: '',
			selectedLocation: '',
			deleteDisabled: false,
			DeleteModal: false,
		};

		this.CreatePage = this.CreatePage.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getData = this.getData.bind(this);
		this.showDynamicForm = this.showDynamicForm.bind(this);
		this.jsonValue = this.jsonValue.bind(this);
	}

	componentDidMount() {
		this.setState({
			pages: this.props.pages,
			tenantId: this.props.tenantId,
			selectedLocation: this.props.selectedLocation,
			applicationMode: this.props.applicationMode
		});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.pages != undefined) {
			this.setState({ pages: nextProps.pages }, () => {
				this.updatePageIndex(); // Call back function as SetState is Asynch
			});

			this.setState({
				tenantId: nextProps.tenantId,
				selectedLocation: nextProps.selectedLocation,
				applicationMode: nextProps.applicationMode
			});
		}
	}
	updatePageIndex() {
		this.state.pages.map((item, index) => {
			this.state.pageId == item._id ?
				this.setState({
					selectedPage: index
				}) : ''
		});
	}
	// Set state editor with value as 'Add'
	CreatePage(event) {

		const schema = {
			key: '',
			collection: '',
			title: '',
			subtitle: '',
			layout: []
		};
		this.setState({
			pageId: uuid.v4(),
			statusFlag: 'new',
			pageJson: schema,
			editor: 'Add',
			selectedPage: '',
			deleteDisabled: false
		});
	}
	DeletePage = () => {
		let newJson = {
			'_id': this.state.pageId, 'statusFlag': this.state.statusFlag == "modified" ? "delete" : "ignore",
			'location': this.state.selectedLocation.id, ...this.state.pageJson
		};
		this.props.actions.SavePages(this.state.tenantId, newJson);
		this.props.SavePages(newJson)
		this.setState({
			editor: {},
			deleteDisabled: false,
			DeleteModal: false
		})
	}
	// Function to get data from child component
	getData(dynamicJSON, key, collection, title, subtitle) {
		let recipesCopy = JSON.parse(JSON.stringify(this.state.pageJson));
		recipesCopy.layout = dynamicJSON;
		recipesCopy.key = key;
		recipesCopy.collection = collection;
		recipesCopy.title = title;
		recipesCopy.subtitle = subtitle;

		this.setState({ pageJson: recipesCopy }, () => {
			this.handleSave(); // Call back function as SetState is Asynch
		})
		this.setState({
			deleteDisabled: true
		})
	}
	handleChange(e) {
		const { name, value } = e.target;
		const rowData = [];
		const rowIndex = [];
		this.state.pages.map((item, index) => (
			value == index ?
				rowData.push({
					key: item.key,
					collection: item.collection,
					title: item.title,
					subtitle: item.subtitle,
					layout: item.layout,
				}) : ''
		));

		var newStatus;
		newStatus = this.state.pages[value]['statusFlag'] == undefined ? "modified" : this.state.pages[value]['statusFlag'];
		this.setState({
			pageId: this.state.pages[value]['_id'],
			statusFlag: newStatus,
			selectedLocation: this.state.selectedLocation,
			pageJson: rowData[0],
			editor: 'Edit',
			selectedPage: value,
			deleteDisabled: true
		});
	}
	jsonValue(e, data) {
		this.setState({ pageJson: JSON.parse(e.json) }, () => {
			this.handleSave(); // Call back function as SetState is Asynch
		})
	}
	handleSave() {
		if (this.state.pageJson) {
			//let newJson = {'_id': uuid.v4(),'statusFlag':'new','location':this.state.selectedLocation.id, ...this.state.pageJson};
			let newJson = { '_id': this.state.pageId, 'statusFlag': this.state.statusFlag, 'location': this.state.selectedLocation.id, ...this.state.pageJson };
			this.props.actions.SavePages(this.state.tenantId, newJson);
			this.props.SavePages(newJson)
		}
		this.setState({
			pageJson: this.state.pageJson,
			
    	});
	}
	handleSubmit(e) {
		e.preventDefault();
		if (this.state.pageJson) {
			//let newJson = {'_id': uuid.v4(),'statusFlag':'new','location':this.state.selectedLocation.id, ...this.state.pageJson};
			let newJson = { '_id': this.state.pageId, 'statusFlag': this.state.statusFlag, 'location': this.state.selectedLocation.id, ...this.state.pageJson };
			this.props.actions.SavePages(this.state.tenantId, newJson);
			this.props.SavePages(newJson)
		}
	}
	showDynamicForm(event) {
		this.setState({ addForm: 'Edit' });
	}
	CancelconfirmationModal = () => {
		this.setState({
			DeleteModal: false,
		})
	};
	confirmationModal = () => {
		this.setState({
			DeleteModal: true
		})
	};
	render() {
		var jEditor = '';
		var viewOnly = '';
		const { pageJson } = this.state;

		viewOnly = this.state.applicationMode == 'EDIT' || this.state.applicationMode == 'CREATE' ? false : true;

		var dynamicForm = '';
		var previewPage = '';

    			
		if (this.state.editor == 'Edit' || this.state.editor == 'Add' ) {
			dynamicForm = <DynamicControls 
								sendData={this.getData} 
								pageJson={pageJson} 
								pages={this.props.pages} 
								selectedPage={this.state.selectedPage} 
								mode={this.state.editor} applicationMode={this.state.applicationMode} />;
								
			previewPage = <PagePreview 
								sendData={this.getData} 
								pageJson={pageJson} 
								pages={this.props.pages} 
								selectedPage={this.state.selectedPage} 
								mode={this.state.editor} />;
			
            jEditor = <Tabs className='z-depth-0'>
					   <Tab disabled={true} title={<i className="orgIcon material-icons" title='JSON Schema' >code</i>} active>
					   <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
									<Row className="margin">
										<Col className="input-field p-0" s={12}>
											<JSONInput
												placeholder={pageJson} // data to display
												theme="light_mitsuketa_tribute"
												id='json_content'
												locale={locale}
												onChange={this.jsonValue}
												height="440px"
												width="500px"
												colors={{
													string: "#DAA520",
													default: '#808080',
													background: "#ececec"// overrides theme colors with whatever color value you want
												}}
												onKeyPressUpdate={false}
												viewOnly={true}
											/>
										</Col>
									</Row>
							</div></Tab>
				   </Tabs>	
		}

		const rowData = [];
		const rowIndex = [];
		var dropDown = '';
		if (this.props.pages) {

			this.props.pages.map((item, index) => (

				rowData.push({
					id: item._id,
					title: item.title,
					collection: item.collection,
					key: item.key,
					index: index,
					statusFlag: item.statusFlag
				})

			));
			if (this.props.pages.length > 0) {
				dropDown = <div>
					<select defaultValue='' s={12} id='page_id' type='select' onChange={this.handleChange} >
						<option value='' disabled >Select Page</option>
						{rowData.map(itemval => {
							var selected = '';
							if (itemval.index === this.state.selectedPage) {
								selected = 'selected';
							}
							if (itemval.statusFlag == "new" || itemval.statusFlag == "modified" || itemval.statusFlag == undefined) {
								return <option value={itemval.index} selected={selected}>{itemval.key}</option>
							} else if (itemval.statusFlag == "delete" || itemval.statusFlag == "ignore") {
								return <option value={itemval.index} selected={selected} className="hiddenDeletedRole" disabled>Select Page</option>
							}
						})}
					</select>
				</div>
			} else {
				dropDown = <div><p>No pages to display. Create a new page</p></div>
			}

			return (
				<div className="switch mb-3 mt-3">
					<Row>
						<Col s={6}>
							<div className='col s12 m12 l12 xl12 mb-2' >
								<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >
									<Row>
										<Col s={8} className='z-depth-8 mr-0'>
											{dropDown}
										</Col>

										{viewOnly == false ? (
											<Col s={4} className='z-depth-8 mr-0'>

												<Button className='btn btn btn_primary otherButtonAddDetUpt iconButton mt-8' name="addOrg" onClick={this.CreatePage}>
													<i className="material-icons" title='Add Page'>
														add_circle</i><span>Add Pages</span>
												</Button>
												{this.state.deleteDisabled ? <Button className='btn btn btn_primary otherButtonAddDetUpt iconButton mt-8' name="addOrg"
													onClick={this.confirmationModal}>
													<i className="material-icons" title='Delete Pages'>
														delete </i>
													<span>Delete Pages</span>
												</Button> : null}
												<Modal
													header='RAPTER Configurator'
													id='DeleteRoleModal'
													modalOptions={{ dismissible: false }}
													open={this.state.DeleteModal} >
													<p>Are you sure you want to delete it?</p>

													<div className="col s12 m12 l12 xl12">
														<Button className="btn btn_secondary otherButtonAddDetUpt modalButton mb-2 ml-1" onClick={this.CancelconfirmationModal}>No</Button>
														<Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' onClick={this.DeletePage} >Yes</Button>

													</div>
												</Modal>

											</Col>
										) : ('')
										}
									</Row>
								</Col>
								<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >
									{dynamicForm}
								</Col>
							</div>
						</Col>
						<Col s={6} >
							{jEditor}
						</Col>
					</Row>
				</div>
			);
		} else { return <p className="pl-2"><Row className='m-0'>{/*<LoadingSpinner />*/}Select the location</Row></p>; }
	}
}
export default PagesTab;