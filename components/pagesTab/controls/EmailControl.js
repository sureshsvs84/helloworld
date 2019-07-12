import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';

class EmailControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			required: false
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
				hint: this.props.data.options ? this.props.data.options.hint : '',
				required: this.props.data.options.validation ? this.props.data.options.validation.required : '',
				property: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.property : '',
				propertyValue: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.value : ''
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
			let required = "";
			let property = "";
			let propertyValue = "";

			if (this.state.name != undefined && this.state.label != undefined) {
				name = this.state.name;
				label = this.state.label;
				if (this.state.hint !== undefined) {
					hint = this.state.hint;
				}
				if (this.state.required !== undefined) {
					required = this.state.required
				}
				if (this.state.property !== undefined) {
					property = this.state.property;
				}
				if (this.state.propertyValue !== undefined) {
					propertyValue = this.state.propertyValue;
				}

				let data = {
					"type": "email",
					"name": name,
					"label": label,
					"options": {
						"hint": hint,
						"validation": {
							"required": required,
							"requiredIf": {
								"property": property,
								"value": propertyValue
							}
						}
					}
				};
				onChange(data, this.props.index);
				alert('Submitted');
				this.props.close();
			}
			else alert("Enter required fields");
		}
		else {
			alert("Name already exists");
			nameExists = "";
		}
	};
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
		if (e.target.type === "checkbox")
			this.setState({
				[e.target.name]: e.target.checked
			})
	};

	render() {
		return (
			<Fragment>
				<div>
					<h5><b>Email Configuration</b></h5>
				</div>
				<Input
					s={12}
					label="Element type"
					id="type"
					name="type"
					type="email"
					value="email"
					disabled
					required
				/>
				<Input
					s={12}
					label="Name *"
					name="name"
					type="text"
					value={this.state.name}
					required
					onChange={this.handleChange}
					className="mb-1 labelText"
					autoComplete='off'
				/><div className="helper-text" >A unique element name</div>
				<Input
					s={12}
					label="Label *"
					id="label"
					name="label"
					type="text"
					value={this.state.label}
					required
					onChange={this.handleChange}
					className="mb-1 labelText"
					autoComplete='off'
				/><div className="helper-text" >The text the user sees</div>
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
				/><div className="helper-text mb-3">Give user a hint</div>
				<fieldset>
					<legend><b>Validation</b></legend>
					<div>
						<div>
							<input s={12} type="checkbox" id="required" checked={this.state.required} className='filled-in' name="required" onChange={this.handleChange} />
							<label htmlFor="required">Required?</label>
						</div>
					</div>
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
							autoComplete='off'
						/><div className="helper-text" >Property name of field dependency.</div>
						<Input
							s={12}
							label="Property value"
							id="propertyValue"
							name="propertyValue"
							type="text"
							value={this.state.propertyValue}
							onChange={this.handleChange}
							className="mb-1 labelText"
							autoComplete='off'
						/><div className="helper-text" >Value of dependent field.</div>
					</fieldset>
				</fieldset>
				<div className="right valign-wrapper mt-2">
					<Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2" onClick={this.handleSubmit}>Submit</Button>
					<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close} >Cancel</Button>
				</div>
			</Fragment>
		);
	}
}
export default EmailControl;