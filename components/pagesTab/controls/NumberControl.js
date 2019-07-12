import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';

class NumberControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "number",
			required: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({
			mode: this.props.mode,
			type: this.props.type,
			data: this.props.data,
		});
		if (Object.keys(this.props.data).length > 0) {
			this.setState({
				label: this.props.data.label,
				name: this.props.data.name,
				prevName: this.props.data.name,
				hint: this.props.data.options.hint,
				defaultValue: this.props.data.options.defaultValue,
				required: this.props.data.options.validation.required,
				min: this.props.data.options.validation.min,
				max: this.props.data.options.validation.max,
				property: this.props.data.options.validation.requiredIf.property,
				value: this.props.data.options.validation.requiredIf.value
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
		this.setState({ [name]: value });
		if (e.target.type == "checkbox") {
			this.setState({ [e.target.name]: e.target.checked })
		}
	}
	handleSubmit() {
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
			let name = '';
			let label = '';
			let hint = '';
			let defaultValue = '';
			let required = '';
			let min = null;
			let max = null;
			let property = '';
			let value = '';
			if (this.state.name != undefined && this.state.label != undefined) {
				name = this.state.name;
				label = this.state.label;
				if (this.state.hint != undefined) {
					hint = this.state.hint;
				}
				if (this.state.defaultValue != undefined) {
					defaultValue = this.state.defaultValue;
				}

				if (this.state.required !== undefined) {
					required = this.state.required;
				}
				if (this.state.min !== undefined) {
					if (this.state.min != "")
						min = this.state.min;
				}
				if (this.state.max !== undefined) {
					if (this.state.max != "")
						max = this.state.max;
				}
				if (this.state.property !== undefined) {
					property = this.state.property;
				}
				if (this.state.value !== undefined) {
					value = this.state.value;
				}

				var initialState = {
					type: this.state.type,
					name,
					label,
					options: {
						hint,
						defaultValue,
						validation: {
							required,
							min,
							max,
							requiredIf: {
								property,
								value
							}
						}
					}
				};
				alert('Submitted');
				onChange(initialState, this.props.index);
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
				<h5><b>Number Configuration</b></h5>
				<Input
					s={12}
					label="Element type"
					id="type"
					name="type"
					type="text"
					value="number"
					disabled
					required
				/>
				<Input
					className="labelText mb-1"
					s={12}
					autoComplete="off"
					label="Name *"
					id="name"
					name="name"
					type="text"
					value={this.state.name}
					required
					onChange={this.handleChange}
				/><div className="helper-text" >A unique element name</div>
				<Input
					className="labelText mb-1"
					s={12}
					autoComplete="off"
					label="Label *"
					id="label"
					name="label"
					type="text"
					value={this.state.label}
					required
					onChange={this.handleChange}
				/><div className="helper-text" >The text the user sees</div>
				<h5><b>Options</b></h5>
				<Input
					className="labelText mb-1"
					s={12}
					autoComplete="off"
					label="Hint"
					name="hint"
					type="text"
					value={this.state.hint}
					onChange={this.handleChange}
				/><div className="helper-text" >Give user a hint</div>
				<Input
					className="labelText mb-1"
					s={12}
					autoComplete="off"
					label="Default value"
					name="defaultValue"
					type="text"
					value={this.state.defaultValue}
					onChange={this.handleChange}
				/><div className="helper-text" >Provide a default value</div>

				<fieldset>
					<legend>Validation</legend>
					<div>
						<input s={12} type="checkbox" className='filled-in' checked={this.state.required} id="required" name="required" onChange={this.handleChange} />
						<label htmlFor="required">Required?</label>
					</div>

					<Input
						className="labelText mb-1"
						s={12}
						autoComplete="off"
						label="Minimum length"
						id="min"
						name="min"
						type="number"
						value={this.state.min}
						onChange={this.handleChange}
						onKeyDown={(evt) => (evt.key === 'e') && evt.preventDefault()}
					/><div className="helper-text" >The minimum value that must be entered</div>
					<Input
						className="labelText mb-1"
						s={12}
						autoComplete="off"
						label="Maximum length"
						id="max"
						name="max"
						type="number"
						value={this.state.max}
						onChange={this.handleChange}
						onKeyDown={(evt) => (evt.key === 'e') && evt.preventDefault()}
					/><div className="helper-text" >The maximum value that can be entered</div>
					<fieldset>
						<legend>Required If?</legend>
						<Input
							className="labelText mb-1"
							s={12}
							autoComplete="off"
							label="Property name"
							id="property"
							name="property"
							type="text"
							value={this.state.property}
							onChange={this.handleChange}
						/><div className="helper-text" >Property name of field dependency</div>
						<Input
							className="labelText mb-1"
							s={12}
							autoComplete="off"
							label="Property value"
							id="value"
							name="value"
							type="text"
							value={this.state.value}
							onChange={this.handleChange}
						/><div className="helper-text" >Value of dependent field</div>
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
export default NumberControl;