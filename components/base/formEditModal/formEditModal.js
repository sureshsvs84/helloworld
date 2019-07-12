import React, { Component, Fragment } from 'react';
import { Input, Button, Modal } from 'react-materialize';

class FormEditModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOrganisation: {
				name: ''
			},
			selectedLocation: {
				name: ''
			},
			parenOfLoc: {
				value: ''
			},
			newOrg: 0
		};
	}
	componentWillReceiveProps(props) {
		this.setState({
			orgsList: props.orgsList,
			selectedOrganisation: props.selectedOrganisation,
			selectedLocation: props.selectedLocation
		});
	}

	_input = (e) => {
		if (e.target.name === 'parenOfLoc') {
			let data = this.props.orgsList.filter((item) => {
				return item.id == e.target.value ? item : null;
			});
			this.setState({
				selectedLocation: {
					...this.state.selectedLocation,
					parentId: data[0].id
				}
			});
		} else {
			this.setState({
				[e.target.name]: {
					...this.state[e.target.name],
					name: e.target.value
				}
			});
		}
	};

	_handleClose = () => {
		this.setState({
			orgName: '',
			locName: '',
			parenOfLoc: {
				value: ''
			}
		});
		this.props.handleModalClose(this.props.name);
	};
	_handleOrg = () => {
		let newOrg = {};
		if (this.state.selectedOrganisation.id !== '') {
			newOrg.id = this.state.selectedOrganisation.id;
			newOrg.level = this.state.selectedOrganisation.level;
			newOrg.name = this.state.selectedOrganisation.name;
			newOrg.tenantId = this.state.selectedOrganisation.tenantId;
			newOrg.ttoId = this.state.selectedOrganisation.ttoId;
			newOrg.userId = this.props.userId;
			newOrg.parentId = this.state.selectedOrganisation.parentId;
			newOrg.statusFlag = this.props.applicationMode == 'CREATE'? 'new': this.state.selectedOrganisation.statusFlag !== ''? 'modified': this.state.selectedOrganisation.statusFlag;
			let isDuplicate = this.props.orgsList.map((iteratedValue) => {
				if (iteratedValue.name === this.state.selectedOrganisation.name) {
					return true;
				}
			});
			if (isDuplicate.includes(true)) {
				window.Materialize.toast('Already Exist', 5000);
			} else {
				let allOrganisations = { ...this.props.allOrganisations };
				allOrganisations[this.state.selectedOrganisation.id] = {
					...allOrganisations[this.state.selectedOrganisation.id],
					...newOrg
				};
				let orgsList = this.props.orgsList;
				orgsList.map((item, i) => {
					if (item.id == this.state.selectedOrganisation.id) {
						orgsList[i] = {
							...orgsList[i],
							...newOrg
						};
					}
				});
				this.setState({
					selectedOrganisation: {
						name: ''
					},
					selectedLocation: {
						name: ''
					}
				});
				this.props.actions.SaveOrganization(newOrg.tenantId, newOrg);
				this.props.setValues('selectedOrganisation',newOrg);
				this.props.setValues('allOrganisations', allOrganisations);
				this.props.setValues('orgsList', orgsList);
				this.props.handleModalClose(this.props.name);
			}
		}
	};
	_handleLoc = () => {
		let newLoc = {};
		if (this.state.selectedLocation.id !== '') {
			// const parent = this.props.allOrganisations.concat(this.props.allLocations);
			newLoc.id = this.state.selectedLocation.id;
			newLoc.level = this.state.selectedLocation.level;
			newLoc.parentId = this.state.selectedLocation.parentId;
			newLoc.ttoId = this.state.selectedLocation.ttoId;
			newLoc.name = this.state.selectedLocation.name;
			newLoc.userId = this.props.userId;
			newLoc.tenantId = this.state.selectedLocation.tenantId;
			newLoc.enrollmentTargets= this.state.selectedLocation.enrollmentTargets != undefined ? this.state.selectedLocation.enrollmentTargets : [];
            newLoc.raConfig =this.state.selectedLocation.raConfig != undefined ? this.state.selectedLocation.raConfig : [];
            newLoc.roles=this.state.selectedLocation.roles != undefined ? this.state.selectedLocation.roles : [];
            newLoc.pages=this.state.selectedLocation.pages != undefined ? this.state.selectedLocation.enrollmentTargets : [];
            newLoc.functions = this.state.selectedLocation.functions != undefined ? this.state.selectedLocation.functions : [];
			newLoc.statusFlag =
				this.props.applicationMode == 'CREATE'
					? 'new'
					: this.state.selectedLocation.statusFlag !== ''
						? 'modified'
						: this.state.selectedLocations.statusFlag;
			const isDuplicate = this.props.orgsList.map((iteratedValue) => {
				if (iteratedValue.name === this.state.selectedLocation.name) {
					return true;
				}
			});

			if (isDuplicate.includes(true)) {
				window.Materialize.toast('Already Exist', 5000);
				return false;
			} else {
				let allLocations = { ...this.props.allLocations };
				allLocations[this.state.selectedLocation.id] = {
					...allLocations[this.state.selectedLocation.id],
					...newLoc
				};
				let orgsList = [ ...this.props.orgsList, { ...newLoc } ];
				this.setState({
					parenOfLoc: {
						value: ''
					}
				});
				this.props.actions.SaveLocation(newLoc.tenantId, newLoc);
				this.props.setValues('selectedLocation',newLoc);
				this.props.setValues('allLocations', allLocations);
				this.props.setValues('orgsList', orgsList);
				this.props.handleModalClose(this.props.name);
			}
		}
	};
	render() {
		return (
			<Modal
				open={this.props.open}
				name={this.props.name}
				header={this.props.header}
				handleModalClose={this.props.handleModalClose}
				modalOptions={{ dismissible: false }}
			>
				<Input
					s={12}
					m={12}
					l={12}
					xl={12}
					// label={(this.props.name == 'editLoc')? 'Edit Location' : 'Edit Organization' }
					className="mt-0 pl-2"
					name={this.props.name == 'editLoc' ? 'selectedLocation' : 'selectedOrganisation'}
					value={
						this.props.name == 'editLoc' ? (
							this.state.selectedLocation.name
						) : (
							this.state.selectedOrganisation.name
						)
					}
					onChange={this._input}
					required
				style={{width:"98%"}}/>
				{this.props.name == 'editLoc' && (
					<select
						name="parenOfLoc"
						onChange={this._input}
						value={this.state.selectedLocation.parentId}
						disabled={true}
						
					>
						<option value="" disabled>
							{' '}
							Choose option{' '}
						</option>
						{this.props.orgsList.map((data) => <option value={data.id}>{data.name}</option>)}
					</select>
				)}
				<div className="col s12 m12 l12 xl12 mt-2">
					<Button
						className="btn_secondary  otherButtonAddDetUpt modalButton mb-2 ml-1"
						onClick={this._handleClose}
					>
						Cancel
					</Button>
					{this.props.name == 'editLoc' && (
						<Button
							className="btn_secondary modalButton otherButtonAddDetUpt mb-2"
							onClick={this._handleLoc}
						>
							Save
						</Button>
					)}
					{this.props.name == 'editOrg' && (
						<Button
							className="btn_secondary modalButton otherButtonAddDetUpt mb-2"
							onClick={this._handleOrg}
						>
							Save
						</Button>
					)}
				</div>
			</Modal>
		);
	}
}

export default FormEditModal;
