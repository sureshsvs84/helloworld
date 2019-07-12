import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';

class PhoneControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			required: false
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
				defaultValue: this.props.data.options ? this.props.data.options.defaultValue : '',
				required: this.props.data.options.validation ? this.props.data.options.validation.required : '',
				minLength: this.props.data.options.validation ? this.props.data.options.validation.minLength : '',
				maxLength: this.props.data.options.validation ? this.props.data.options.validation.maxLength : '',
				property: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.property : '',
				value: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.value : ''
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
		if (e.target.type == "checkbox")
			this.setState({ [e.target.name]: e.target.checked });
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
			let defaultValue = "";
			let required = "";
			let minLength = null;
			let maxLength = null;
			let property = "";
			let value = "";
			if (this.state.name != undefined && this.state.label != undefined) {
				name = this.state.name;
				label = this.state.label;
				if (this.state.defaultValue != undefined)
					defaultValue = this.state.defaultValue;
				if (this.state.required != undefined)
					required = this.state.required;
				if (this.state.minLength != undefined) {
					if (this.state.minLength != "")
						minLength = parseInt(this.state.minLength);
				}
				if (this.state.maxLength != undefined) {
					if (this.state.maxLength != "")
						maxLength = parseInt(this.state.maxLength);
				}
				if (this.state.property != undefined)
					property = this.state.property;
				if (this.state.value != undefined)
					value = this.state.value;
				let data = {
					"type": "phone",
					"name": name,
					"label": label,
					"options": {
						"defaultValue": defaultValue,
						"validation": {
							"required": required,
							"minLength": minLength,
							"maxLength": maxLength,
							"requiredIf": {
								"property": property,
								"value": value
							}
						}
					}
				};
				onChange(data, this.props.index);
				alert('Submitted');
				this.props.close();
			}
			else alert("Please fill the mandatory fields");
		}
		else {
			alert("Name already exists");
			nameExists = "";
		}
	};

	render() {
		return (
			<Fragment>
				<h5><b>Phone Configuration</b></h5>
				<Input
					s={12}
					label="Element type"
					id="type"
					name="type"
					type="text"
					value="phone"
					disabled
					required />
				<Input
					s={12}
					className="mb-1 labelText"
					label="Name *"
					id="name"
					name="name"
					type="text"
					value={this.state.name}
					onChange={this.handleChange}
					required
					autoComplete='off' />
				<div className="helper-text" >A unique element name</div>
				<Input
					s={12}
					className="mb-1 labelText"
					label="Label *"
					id="label"
					name="label"
					type="text"
					value={this.state.label}
					required
					onChange={this.handleChange}
					autoComplete='off' />
				<div className="helper-text" >The text the user sees</div>
				<div>
					<h5><b>Options</b></h5>
					<Input
						s={12}
						className="mb-1"
						name="hint"
						type="text"
						value="Hint"
						disabled
						required />
					<div className="helper-text" >Give user a hint</div>
					<Input
						s={12}
						className="mb-1 labelText"
						label="Default value"
						id="defaultValue"
						name="defaultValue"
						type="text"
						value={this.state.defaultValue}
						onChange={this.handleChange}
						autoComplete='off' />
					<div className="helper-text" >Provide a default value</div>
					<Input
						s={12}
						className="mb-1"
						name="inputMask"
						type="text"
						value="Input mask"
						disabled
						required />
					<div className="helper-text" >Enter the input mask.</div>
					<fieldset>
						<legend><b>Validation</b></legend>
						<input s={12} type="checkbox" className='filled-in' id="required" name="required" checked={this.state.required} onChange={this.handleChange} />
						<label htmlFor="required">Required?</label>
						<Input
							s={12}
							className="mb-1 labelText"
							label="Minimum length"
							id="minLength"
							name="minLength"
							type="number"
							value={this.state.minLength}
							onChange={this.handleChange}
							onKeyDown={(evt) => (evt.key === 'e') && evt.preventDefault()} />
						<div className="helper-text" >The minimum characters that must be entered</div>
						<Input
							s={12}
							className="mb-1 labelText"
							label="Maximum length"
							id="maxLength"
							name="maxLength"
							type="number"
							value={this.state.maxLength}
							onChange={this.handleChange}
							onKeyDown={(evt) => (evt.key === 'e') && evt.preventDefault()} />
						<div className="helper-text" >The maximum characters that can be entered</div>
						<Input
							s={12}
							className="mb-1"
							name="pattern"
							type="text"
							value="Pattern"
							disabled
							required />
						<div className="helper-text" >The pattern that can be entered.</div>
						<Input
							s={12}
							className="mb-1"
							name="patternValMsg"
							type="text"
							value="Pattern validation message"
							disabled
							required />
						<div className="helper-text" >Error message for text not matching pattern.</div>
						<fieldset>
							<legend><b>Required If?</b></legend>
							<Input
								s={12}
								label="Property name"
								id="property"
								name="property"
								type="text"
								value={this.state.property}
								onChange={this.handleChange}
								className="mb-1 labelText"
								autoComplete='off' />
							<div className="helper-text" >Property name of field dependency.</div>
							<Input
								s={12}
								label="Property value"
								id="value"
								name="value"
								type="text"
								value={this.state.value}
								onChange={this.handleChange}
								className="mb-1 labelText"
								autoComplete='off' />
							<div className="helper-text" >Value of dependent field.</div>
						</fieldset>
					</fieldset>
				</div>
				<div className="pt-2 right valign-wrapper" >
					<Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2" onClick={this.handleSubmit}>Submit</Button>
					<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close}>Cancel</Button>
				</div>
			</Fragment >
		);
	}
}
export default PhoneControl;