import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';
import { flatten } from 'flat';

class SelectControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			required: false,
			items: [{ label: "" }]
		};
	}

	componentDidMount() {
		this.setState({
			mode: this.props.mode,
			type: this.props.type,
			data: this.props.data,
		});
		if (Object.keys(this.props.data).length > 0) {
			this.setState({
				name: this.props.data.name,
				prevName: this.props.data.name,
				label: this.props.data.label,
				hint: this.props.data.options ? this.props.data.options.hint : '',
				defaultValue: this.props.data.options ? this.props.data.options.defaultValue : '',
				property: this.props.data.options.showIf ? this.props.data.options.showIf.property : '',
				value: this.props.data.options.showIf ? this.props.data.options.showIf.value : '',
				required: this.props.data.options.validation ? this.props.data.options.validation.required : '',
				validationProperty: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.property : '',
				validationValue: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.value : '',
				items: this.props.data.options ? this.props.data.options.items : ''
			})
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			mode: nextProps.mode,
			type: nextProps.type,
			data: nextProps.data,
		});
	}
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		if (e.target.type === "checkbox")
			this.setState({ [e.target.name]: e.target.checked });
	}
	handleItemChange = idx => evt => {
		this.setState({ [evt.target.name]: evt.target.value }, () => { this.itemSchema(idx) });
	}
	itemSchema = (idx) => {
		var flattenData = '';
		var item = this.state.items[idx];
		flattenData = flatten(item);

		var itemValue = this.state[`itemValue${idx}`] !== undefined ? this.state[`itemValue${idx}`] : flattenData['value'];
		var itemLabel = this.state[`itemLabel${idx}`] !== undefined ? this.state[`itemLabel${idx}`] : flattenData['label'];
		var type = this.state[`type${idx}`] !== undefined ? this.state[`type${idx}`] : flattenData['options.specify.type'];
		var otherName = this.state[`otherName${idx}`] !== undefined ? this.state[`otherName${idx}`] : flattenData['options.specify.name'];
		var otherLabel = this.state[`otherLabel${idx}`] !== undefined ? this.state[`otherLabel${idx}`] : flattenData['options.specify.label'];
		var otherHint = this.state[`otherHint${idx}`] !== undefined ? this.state[`otherHint${idx}`] : flattenData['options.specify.options.hint'];
		var otherProperty = this.state[`otherProperty${idx}`] !== undefined ? this.state[`otherProperty${idx}`] : flattenData['options.specify.options.validation.requiredIf.property'];
		var otherValue = this.state[`otherValue${idx}`] !== undefined ? this.state[`otherValue${idx}`] : flattenData['options.specify.options.validation.requiredIf.value'];

		var initialItemSchema = {
			"value": itemValue,
			"label": itemLabel,
			"options": {
				"specify": {
					"type": type,
					"name": otherName,
					"label": otherLabel,
					"options": {
						"hint": otherHint,
						"validation": {
							"requiredIf": {
								"property": otherProperty,
								"value": otherValue
							}
						}
					}
				}
			}
		};

		const newItems = this.state.items.map((item, sidx) => {
			if (idx !== sidx) return item;
			return { ...item, ...initialItemSchema };
		});
		this.setState({ items: newItems });
	}
	handleAddItem = () => {
		this.setState({ items: this.state.items.concat([{ label: "" }]) });
	};
	handleRemoveItem = idx => () => {
		this.setState({ items: this.state.items.filter((data, sidx) => idx !== sidx) });
	}
	handleSubmit = () => {
		const { onChange } = this.props;

		let nameExists = "";
		if (this.state.mode == "ADD") {
			this.props.values.map(item => {
				if (item.name.toLowerCase() == this.state.name.toLowerCase())
					nameExists = "yes";
			})
		}
		else if (this.state.mode == "EDIT") {
			if (this.state.prevName != this.state.name) {
				this.props.values.map(item => {
					if (item.name.toLowerCase() == this.state.name.toLowerCase())
						nameExists = "yes";
				})
			}
		}
		if (nameExists != "yes") {
			let name = "";
			let label = "";
			let hint = "";
			let defaultValue = "";
			let property = "";
			let value = "";
			let required = "";
			let validationProperty = "";
			let validationValue = "";
			let items = [];

			if (this.state.name != undefined && this.state.label != undefined) {
				name = this.state.name;
				label = this.state.label;
				items = this.state.items;
				if (this.state.hint !== undefined)
					hint = this.state.hint;
				if (this.state.defaultValue !== undefined)
					defaultValue = this.state.defaultValue;
				if (this.state.property !== undefined)
					property = this.state.property;
				if (this.state.value !== undefined)
					value = this.state.value;
				if (this.state.required !== undefined)
					required = this.state.required;
				if (this.state.validationProperty !== undefined)
					validationProperty = this.state.validationProperty;
				if (this.state.validationValue !== undefined)
					validationValue = this.state.validationValue;

				let data = {
					"type": this.state.type,
					"name": name,
					"label": label,
					"options": {
						"hint": hint,
						"defaultValue": defaultValue,
						"showIf": {
							"property": property,
							"value": value
						},
						"validation": {
							"required": required,
							"requiredIf": {
								"property": validationProperty,
								"value": validationValue
							}
						},
						"items": items
					}
				}
				onChange(data, this.props.index);
				alert('submitted');
				this.props.close();
			}
			else alert("Enter required fields");
		}
		else {
			alert("Name already exists");
			nameExists = "";
		}
	}

	render() {
		var flattenData = "";
		return (
			<Fragment>
				<h5><b>Select Configuration</b></h5>
				<Input
					s={12}
					label="Element type"
					id="type"
					name="type"
					type="text"
					value="select"
					disabled
					required
					className="labelText"
				/>
				<Input
					s={12}
					label="Name *"
					id="name"
					name="name"
					type="text"
					className="mb-1 labelText"
					value={this.state.name}
					onChange={this.handleChange}
					autoComplete='off'
					required
				/><div className="helper-text" >A unique element name</div>
				<Input
					s={12}
					label="Label *"
					id="label"
					name="label"
					type="text"
					className="mb-1 labelText"
					value={this.state.label}
					onChange={this.handleChange}
					autoComplete='off'
					required
				/><div className="helper-text" >What the user sees</div>
				<h5><b>Options</b></h5>
				<Input
					s={12}
					label="Hint"
					id="hint"
					name="hint"
					type="text"
					value={this.state.hint}
					onChange={this.handleChange}
					className="mb-1 labelText"
					autoComplete='off'
				/><div className="helper-text" >Provide additional instructions if necessary</div>
				<Input
					s={12}
					label="Default value"
					id="defaultValue"
					name="defaultValue"
					type="text"
					value={this.state.defaultValue}
					onChange={this.handleChange}
					className="mb-1 labelText"
					autoComplete='off'
				/><div className="helper-text" >Provide a default value</div>
				<fieldset>
					<legend><b>Show If?</b></legend>
					<Input
						s={12}
						label="Property name"
						id="property"
						name="property"
						type="text"
						value={this.state.property}
						onChange={this.handleChange}
						className="mb-1 labelText"
						autoComplete='off'
					/><div className="helper-text" >Property name of field dependency.</div>
					<Input
						s={12}
						label="Property value"
						id="value"
						name="value"
						type="text"
						value={this.state.value}
						onChange={this.handleChange}
						className="mb-1 labelText"
						autoComplete='off'
					/><div className="helper-text" >Value of dependent field.</div>
				</fieldset>
				<fieldset>
					<legend><b>Validation</b></legend>
					<input s={12} type="checkbox" id="required" checked={this.state.required} className='filled-in' name="required"
						onChange={this.handleChange} />
					<label htmlFor="required">Required?</label>
					<fieldset>
						<legend><b>Required If?</b></legend>
						<Input
							s={12}
							label="Property name"
							id="validationProperty"
							name="validationProperty"
							type="text"
							value={this.state.validationProperty}
							onChange={this.handleChange}
							className="mb-1 labelText"
							autoComplete='off'
						/><div className="helper-text" >Property name of field dependency.</div>
						<Input
							s={12}
							label="Property value"
							id="validationValue"
							name="validationValue"
							type="text"
							value={this.state.validationValue}
							onChange={this.handleChange}
							className="mb-1 labelText"
							autoComplete='off'
						/><div className="helper-text" >Value of dependent field.</div>
					</fieldset>
				</fieldset>
				<h5>Items</h5>
				{this.state.items.map((item, idx) => {
					flattenData = flatten(item);
					return <fieldset>
						<div className="collection-item">
							<div className="valign-wrapper">
								<button className='col s12 m4 l4 xl4 mt-1' name="deleteItem" onClick={this.handleRemoveItem(idx)}
									style={{ backgroundColor: 'unset', border: 'unset', color: '#004e92' }} >
									<i className="material-icons" title='Delete'>delete</i>
								</button>
							</div>
							<div className="valign-wrapper">
								<Col s={12} m={6} l={4} xl={12} >
									<Input
										s={8}
										label="Value *"
										id={`itemValue${idx}`}
										name={`itemValue${idx}`}
										type="text"
										value={item.value}
										onChange={this.handleItemChange(idx)}
										className="mb-1 labelText"
										autoComplete='off'
										required
									/>
								</Col>
							</div>
							<div className="ml-2 helper-text" >Enter value</div>
							<div className="valign-wrapper">
								<Col s={12} m={6} l={4} xl={12} >
									<Input
										s={8}
										label="Label *"
										id={`itemLabel${idx}`}
										name={`itemLabel${idx}`}
										type="text"
										value={item.label}
										onChange={this.handleItemChange(idx)}
										className="mb-1 labelText"
										autoComplete='off'
										required
									/>
								</Col>
							</div>
							<div className="ml-2 helper-text" >Enter label</div>
							<Collapsible accordion={false}>
								<CollapsibleItem header='Options' icon="keyboard_arrow_down">
									<h6 className="pl-1"><b>Others Specify</b></h6>
									<div className="valign-wrapper">
										<Col className="ml-2 mb-1" s={8} l={4} xl={8} >
											<select className="pl-0" value={flattenData['options.specify.type']} id={`type${idx}`}
												name={`type${idx}`} onChange={this.handleItemChange(idx)} >
												<option value='' >Element Type</option>
												<option value='text' >Text</option>
											</select>
										</Col>
									</div>
									<div className="valign-wrapper">
										<Col s={12} m={6} l={4} xl={12} >
											<Input
												s={8}
												label='Name'
												id={`otherName${idx}`}
												name={`otherName${idx}`}
												type="text"
												value={flattenData['options.specify.name']}
												onChange={this.handleItemChange(idx)}
												className="mb-1 labelText"
												autoComplete='off'
											/>
										</Col>
									</div>
									<div className="ml-2 helper-text" >A unique element name</div>
									<div className="valign-wrapper">
										<Col s={12} m={6} l={4} xl={12} >
											<Input
												s={8}
												label='Label'
												id={`otherLabel${idx}`}
												name={`otherLabel${idx}`}
												type="text"
												value={flattenData['options.specify.label']}
												onChange={this.handleItemChange(idx)}
												className="mb-1 labelText"
												autoComplete='off'
											/>
										</Col>
									</div>
									<div className="ml-2 helper-text" >The text the user sees</div>
									<div className="valign-wrapper">
										<h6 className="pl-1"><b>Options</b></h6>
									</div>
									<div className="valign-wrapper">
										<Col s={12} m={6} l={4} xl={12} >
											<Input
												s={8}
												label='Hint'
												id={`otherHint${idx}`}
												name={`otherHint${idx}`}
												type="text"
												value={flattenData['options.specify.options.hint']}
												onChange={this.handleItemChange(idx)}
												className="mb-1 labelText"
												autoComplete='off'
											/>
										</Col>
									</div>
									<div className="ml-2 helper-text" >Give the user a hint</div>
									<fieldset>
										<legend><b>Validation</b></legend>
										<fieldset>
											<legend><b>Required If?</b></legend>
											<Input
												s={12}
												label="Property name"
												id={`otherProperty${idx}`}
												name={`otherProperty${idx}`}
												type="text"
												value={flattenData['options.specify.options.validation.requiredIf.property']}
												onChange={this.handleItemChange(idx)}
												className="mb-1 labelText"
												autoComplete='off'
											/><div className="helper-text" >Property name of field dependency.</div>
											<Input
												s={12}
												label="Property value"
												id={`otherValue${idx}`}
												name={`otherValue${idx}`}
												type="text"
												value={flattenData['options.specify.options.validation.requiredIf.value']}
												onChange={this.handleItemChange(idx)}
												className="mb-1 labelText"
												autoComplete='off'
											/><div className="helper-text" >Value of dependent field.</div>
										</fieldset>
									</fieldset>
								</CollapsibleItem>
							</Collapsible>
						</div>
					</fieldset>
				})}
				<Col s={12} xl={12} >
					<Button type="button" className='btn btn_primary otherButtonAddDetUpt iconButton right' name="addOrg" onClick={this.handleAddItem} >
						<i className="material-icons" title='Add Items'>add_circle</i><span>Add Items</span>
					</Button>
				</Col>
				<div className="right valign-wrapper mt-2">
					<Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2" onClick={this.handleSubmit}>Submit</Button>
					<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close}>Cancel</Button>
				</div>
			</Fragment>
		);
	}
}
export default SelectControl;