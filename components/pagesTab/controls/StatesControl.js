import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';

class StatesControl extends Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			label: '',
			option_hint: '',
			option_defaultValue: '',
			option_showIf_property: '',
			option_showIf_value: '',
			option_validation_required: false,
			option_validation_requiredIf_property: '',
			option_validation_requiredIf_value: '',
		};

		this.handleChange = this.handleChange.bind(this);
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
				option_hint: this.props.data.options.hint,
				option_defaultValue: this.props.data.options.defaultValue,
				option_showIf_property: this.props.data.options.showIf.property,
				option_showIf_value: this.props.data.options.showIf.value,
				option_validation_required: this.props.data.options.validation.required,
				option_validation_requiredIf_property: this.props.data.options.validation.requiredIf.property,
				option_validation_requiredIf_value: this.props.data.options.validation.requiredIf.value,
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

	handleChange(e) {
		const { name, value, checked } = e.target;
		let tempValue = value;
		if (name === "option_validation_required") {
			tempValue = checked;
		}
		this.setState({ [name]: tempValue })
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
			if (this.state.name !== undefined) {
				var name = this.state.name
			}
			if (this.state.label !== undefined) {
				var label = this.state.label
			}
			if (this.state.option_hint !== undefined) {
				var option_hint = this.state.option_hint
			}
			if (this.state.option_defaultValue !== undefined) {
				var option_defaultValue = this.state.option_defaultValue
			}
			if (this.state.option_showIf_property !== undefined) {
				var option_showIf_property = this.state.option_showIf_property
			}
			if (this.state.option_showIf_value !== undefined) {
				var option_showIf_value = this.state.option_showIf_value
			}
			var option_validation_required = this.state.option_validation_required
			if (this.state.option_validation_requiredIf_property !== undefined) {
				var option_validation_requiredIf_property = this.state.option_validation_requiredIf_property
			} if (this.state.option_validation_requiredIf_value !== undefined) {
				var option_validation_requiredIf_value = this.state.option_validation_requiredIf_value
			}
			var initialState = {
				type: "states",
				name,
				label,
				options: {
					"hint": option_hint,
					"defaultValue": option_defaultValue,
					"showIf": {
						"property": option_showIf_property,
						"value": option_showIf_value
					},
					"validation": {
						"required": option_validation_required,
						"requiredIf": {
							"property": option_validation_requiredIf_property,
							"value": option_validation_requiredIf_value
						}
					}
				}
			};
			onChange(initialState, this.props.index);
			this.props.close();
		}
		else {
			alert("Name already exists");
			nameExists = "";
		}
	}

	render() {
		return (
			<Fragment>
				<div>
					<h5><b>States Configuration</b></h5>
				</div>
				<div>
					<Input
						s={12}
						label="Element type"
						id="type"
						name="type"
						type="text"
						value="States"
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
						className="labelText mb-1"
						value={this.state.name}
						required
						onChange={this.handleChange}
						autoComplete='off'
					/><div className="helper-text" >A unique element name</div>
				</div>
				<div>
					<Input
						s={12}
						label="Label *"
						id="label"
						name="label"
						type="text"
						className="labelText mb-1"
						value={this.state.label}
						required
						onChange={this.handleChange}
						autoComplete='off'
					/><div className="helper-text" >A unique element name</div>
				</div>

				<div>
					<div>
						<Input s={12} className="labelText mb-1" name="option_hint" type="text" value={this.state.option_hint} label="Hint"
							onChange={this.handleChange} autoComplete='off' />
						<div className="helper-text" >Give user a hint</div>
					</div>
					<div>
						<Input s={12} className="labelText mb-1" label="Default value" id="statesDefaultValue" name="option_defaultValue" type="text" value={this.state.option_defaultValue}
							onChange={this.handleChange} autoComplete='off' />
						<div className="helper-text" >Provide a default value</div>
					</div>

					<fieldset><legend><b>show if?</b></legend>
						<div>
							<Input s={12} className="labelText mb-1" label="Property Name" id="showIfPropertyName" name="option_showIf_property" type="text" value={this.state.option_showIf_property}
								onChange={this.handleChange} autoComplete='off' />
							<div className="helper-text" >Property name of field dependency.</div>
						</div>
						<div>
							<Input s={12} className="labelText mb-1" label="Property Value" id="showIfPropertyValue" name="option_showIf_value" type="text" value={this.state.option_showIf_value}
								onChange={this.handleChange} autoComplete='off' />
							<div className="helper-text" >Value of dependent field</div>
						</div>
					</fieldset>

					<fieldset>
						<legend><b>Validation</b></legend>
						<div className="col s12 pl-0">
							<Input type="checkbox" className='filled-in' id="" name="option_validation_required" label={"Required"}
								checked={this.state.option_validation_required} autoComplete='off' onChange={this.handleChange} />
						</div>
						<fieldset>
							<legend><b>Required If?</b></legend>
							<div>
								<Input s={12} className="labelText mb-1" label="Property name" id="validationPropertyName" name="option_validation_requiredIf_property" type="text"
									value={this.state.option_validation_requiredIf_property} autoComplete='off' onChange={this.handleChange} />
								<div className="helper-text" >Property name of field dependency.</div>
							</div>
							<div>
								<Input s={12} className="labelText mb-1" label="Property value" id="validationPropertyValue" name="option_validation_requiredIf_value" type="text"
									value={this.state.option_validation_requiredIf_value} onChange={this.handleChange} autoComplete='off' />
								<div className="helper-text" >Value of dependent field.</div>
							</div>
						</fieldset>
					</fieldset>
				</div>

				<div className="right valign-wrapper mt-2">
					<Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2" onClick={this.handleSubmit}>Submit</Button>
					<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close} >Cancel</Button>

				</div>
			</Fragment>
		);
	}
}
export default StatesControl;