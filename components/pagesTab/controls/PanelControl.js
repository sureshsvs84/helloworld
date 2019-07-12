import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';
import { flatten } from 'flat';
import ActionControl from '../controls/ActionControl';
import AddressControl from '../controls/AddressControl';
import ArrayControl from '../controls/ArrayControl';
import ButtonControl from '../controls/ButtonControl';
import CheckboxControl from '../controls/CheckboxControl';
import CheckgroupControl from '../controls/CheckgroupControl';
import DateControl from '../controls/DateControl';
import EmailControl from '../controls/EmailControl';
import FieldsetControl from '../controls/FieldsetControl';
import HeadingControl from '../controls/HeadingControl';
import LayoutControl from '../controls/LayoutControl';
import NumberControl from '../controls/NumberControl';
import PanelControlMain from '../controls/PanelControl';
import PasswordControl from '../controls/PasswordControl';
import PhoneControl from '../controls/PhoneControl';
import RadioControl from '../controls/RadioControl';
import SelectControl from '../controls/SelectControl';
import SliderControl from '../controls/SliderControl';
import SsnControl from '../controls/SsnControl';
import StatesControl from '../controls/StatesControl';
import StaticControl from '../controls/StaticControl';
import StaticpanelControl from '../controls/StaticpanelControl';
import TextControl from '../controls/TextControl';
import TextareaControl from '../controls/TextareaControl';
import TextmaskControl from '../controls/TextmaskControl';
import TimeControl from '../controls/TimeControl';
import SlidertoogleControl from '../controls/SlidertoogleControl';
import ZipControl from '../controls/ZipControl';
import elementType from '../controls/json/element-type.json';

class PanelControl extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			name: '',
			label: '',
			name: "",
			fields: [],
			isModalOpen: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleRequiredChange = this.handleRequiredChange.bind(this);
		this.handleDefaultEmptyChange = this.handleDefaultEmptyChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addClick = this.addClick.bind(this);
		this.removeClick = this.removeClick.bind(this);
	}

	componentDidMount() {
		this.setState({
			mode: this.props.mode,
			innerMode: this.props.mode,
			type: this.props.type,
			data: this.props.data,
		});
		if (Object.keys(this.props.data).length > 0) {
			this.setState({
				name: this.props.data.name,
				prevName: this.props.data.name,
				label: this.props.data.label,
				hint: this.props.data.options ? this.props.data.options.hint : '',
				fields: this.props.data.options.fields ? this.props.data.options.fields : '',
				property: this.props.data.options.showIf ? this.props.data.options.showIf.property : '',
				value: this.props.data.options.showIf ? this.props.data.options.showIf.value : ''
			})
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			mode: nextProps.mode,
			type: nextProps.type,
			innertype: nextProps.innertype,
			data: nextProps.data,
		});
	}
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value }, () => {
			this.createSchema(); // Call back function as SetState is Asynch
		})
	}
	handleOpenModal = (e, i) => {
		let data = [];
		if (e.currentTarget.name == "ADD") {
			this.setState({ data,innertype: '', isModalOpen: true, mode: "ADD" })
		} else if (e.currentTarget.name == "EDIT") {
			data = this.state.fields[i];
			console.log("Data", data);
			this.setState({ mode: "EDIT", idx: i, data, innertype: data.type, isModalOpen: true, })
		}
		// this.setState({ isModalOpen: true,
		//  })
	};
	handleCloseModal = () => {
		this.setState({
			idx: '',
			type: '',
			data: {},
			isModalOpen: false
		})
	};
	handleTypeChange(e) {
		//alert('handletype');
		const { name, value } = e.target;
		this.setState({ [name]: value }, () => {
			return this.addControl(); // Call back function as SetState is Asynch
		})
	}
	handleRequiredChange(e) {
		this.setState({ required: !this.state.required }, () => {
			this.viewRadio(); // Call back function as SetState is Asynch
		})
	}
	handleDefaultEmptyChange(e) {
		this.setState({ defaultEmpty: !this.state.defaultEmpty }, () => {
			this.viewRadio(); // Call back function as SetState is Asynch
		})
	}
	viewRadio = () => {
		//console.log("Required",this.state.required)
		//console.log("defaultEmpty",this.state.defaultEmpty)
	}
	addClick(schema, index) {
		let valueIndex;
		this.state.fields.map((data, idx) => {
			if (idx == index) {
				valueIndex = idx
			}
		});

		if (valueIndex > -1) {
			let fields = this.state.fields;
			fields[valueIndex] = schema;
			this.setState({
				fields
			})
		}
		else {
			this.setState(prevState => ({ fields: [...prevState.fields, schema] }))
		}

		this.setState({ isModalOpen: false }, () => {
			this.handleSave(); // Call back function as SetState is Asynch
		})
	}
	removeClick(i) {
		let fields = [...this.state.fields];
		fields.splice(i, 1);
		this.setState({ fields });
	}
	addControl(data, idx) {
		const { innertype } = this.state;

		switch (innertype) {

			case 'action-toolbar':
				return (<ActionControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'address':
				return (<AddressControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'array':
				return (<ArrayControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'button':
				return (<ButtonControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'checkbox':
				return (<CheckboxControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'checkbox-group':
				return (<CheckgroupControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'date':
				return (<DateControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'email':
				return (<EmailControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'fieldset':
				return (<FieldsetControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'heading':
				return (<HeadingControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'layout-editor':
				return (<LayoutControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'number':
				return (<NumberControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'panel':
				return (<PanelControlMain index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'password':
				return (<PasswordControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'phone':
				return (<PhoneControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'radio':
				return (<RadioControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'select':
				return (<SelectControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'slider':
				return (<SliderControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'slide-toggle':
				return (<SlidertoogleControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'ssn':
				return (<SsnControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'states':
				return (<StatesControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'static':
				return (<StaticControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'static-panel':
				return (<StaticpanelControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'text':
				return (<TextControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'textarea':
				return (<TextareaControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'text-mask':
				return (<TextmaskControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'time':
				return (<TimeControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			case 'zip':
				return (<ZipControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.mode} close={this.handleCloseModal} values={this.state.fields} />);
			default:
				return <span className="pl-2">Select element type</span>;
		}
		//this.setState({ isModalOpen: false })
	}
	createSchema() {
		//onChange(index,initialState);
	}
	handleSubmit() {
		const { onChange } = this.props;

		let nameExists = "";
		if (this.state.innerMode == "ADD") {
			this.props.values.map(item => {
				if (item.name.toLowerCase() == this.state.name.toLowerCase())
					nameExists = "yes";
			})
		}
		else if (this.state.innerMode == "EDIT") {
			if (this.state.prevName != this.state.name) {
				this.props.values.map(item => {
					if (item.name.toLowerCase() == this.state.name.toLowerCase())
						nameExists = "yes";
				})
			}
		}
		if (nameExists != "yes") {
			var type = "panel";
			if (this.state.name !== undefined) {
				var name = this.state.name
			}
			if (this.state.label !== undefined) {
				var label = this.state.label
			}
			if (this.state.hint != undefined) {
				var hint = this.state.hint;
			}
			if (this.state.fields !== undefined) {
				var fields = this.state.fields;
			}

			var initialState = {
				type,
				name,
				label,
				options: {
					hint,
					fields
				},
			};
			alert('Submitted');
			onChange(initialState, this.props.index);
			this.props.close();
		}
		else {
			alert("Name already exists");
			nameExists = "";
		}
	}
	handleSave = () => {
		//console.log("Fields",this.state.fields)
	}
	createUI() {
		var renderfields = '';
		const { fields } = this.state;

		renderfields = fields.map((el, i) => {
			return <li className="collection-item">
				<div key={i}>
					<Row>
						<Col s={3}>
							<h6 className="truncate labelText mb-1" >{el.name}</h6>
						</Col>
						<Col s={6}>
							<h6 className="truncate" style={{ textTransform: 'capitalize' }}><b>{el.type} configuration</b></h6>
						</Col>

						<Col s={3} >
							<Button type='button' className='orgIcon col s12 m2 l2 xl2' name="deleteOrg" onClick={this.removeClick.bind(this, i)}>
								<i className="material-icons" title='Delete'>delete</i>
							</Button>
							<Button type='button' className='orgIcon col s12 m2 l2 xl2' name="EDIT" onClick={(e) => this.handleOpenModal(e, i)}>
								<i className="material-icons" title='Update'>edit</i>
							</Button>
						</Col>

					</Row>
				</div>
			</li>;
		});

		return <div>{renderfields}</div>
	}

	render() {
		var flattenData = '';
		const { data } = this.state;

		return (
			<Fragment>
				<div>
					<div>
						<h5><b>Panel Configuration</b></h5>
					</div>
					<div>
						<Input
							s={12}
							label="Element type"
							id="type"
							name="type"
							type="text"
							value="panel"
							disabled
							required
						/>
					</div>
					<div>
						<Input
							s={12}
							label="Name *"
							id="name"
							name="name"
							type="text"
							value={this.state.name}
							required
							onChange={this.handleChange}
							className="labelText mb-1"
						/><div className="helper-text" >A unique element name</div>
					</div>
					<div>
						<Input
							s={12}
							label="Label *"
							id="label"
							name="label"
							type="text"
							value={this.state.label}
							required
							onChange={this.handleChange}
							className="labelText mb-1"
						/><div className="helper-text" >The text the user sees</div>
					</div>
					<div>
						<div>
							<h5>Options</h5>
							<div>
								<Input
									s={12}
									label="Hint"
									id="hint"
									name="hint"
									type="text"
									value={this.state.hint}
									onChange={this.handleChange}
									className="labelText mb-1"
								/><div className="helper-text" >Give user a hint</div>
							</div>
							<div>
								<Col s={12} m={6} l={4} xl={12} >
									<Button type="button" className='btn btn btn_primary otherButtonAddDetUpt iconButton right' name="ADD" onClick={this.handleOpenModal}>
										<i className="material-icons" title='Add Items'>add_circle</i><span>Add Controls</span>
									</Button>
								</Col>
							</div>
							<Row>
								<div><ul className="collection">  {this.createUI()}</ul></div>
							</Row>
						</div>
					</div>
				</div>
				<div className="right valign-wrapper mt-2">
					<Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2" onClick={this.handleSubmit}>Submit</Button>
					<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close} >Cancel</Button>
				</div>

				<Modal className="modal modal-fixed-footer dynamicModal" header={this.state.mode == "ADD" ? "Add an element " : "Update an element"} open={this.state.isModalOpen} modalOptions={{ dismissible: false }} close={this.handleCloseModal} >
					<button className="modal_close" onClick={this.handleCloseModal}><i class="material-icons " >close</i> </button>
					<Row>
						<form onSubmit={this.handleControlSubmit} >
							{this.state.mode == "ADD" &&
								<div className="modal-content">
									<label className="innerDynamicLabel">Element type</label>
									<select className="pl-1" defaultValue="" name='innertype' id='innertype' onChange={this.handleTypeChange} value={this.state.innertype} required s={4}>
										<option value="" >Choose your element</option>
										{elementType.map(itemval => {
											return <option value={itemval.value}>{itemval.label}</option>
										})}
									</select>
									{this.addControl(this.state.data)}
								</div>}
							{this.state.mode == "EDIT" &&
								<div className="row">
									<div className="modal-content dataControl pt-1">
										{this.addControl(this.state.data, this.state.idx)}
									</div>
								</div>
							}
						</form>
					</Row>
				</Modal>
			</Fragment>
		);
	}
}
export default PanelControl;