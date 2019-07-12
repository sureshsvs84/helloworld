import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';

class SlidertoogleControl extends Component {

	constructor(props) {
		super(props);
		this.state = {
			type: 'slide-toggle',
			align: 'after',
			disabled: false,
			color: 'accent',
			required: false,
			name: ''
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
				align: this.props.data.options.align,
				color: this.props.data.options.color,
				defaultValue: this.props.data.options.defaultValue,
				required: this.props.data.options.validation.required,
				property: this.props.data.options.validation.requiredIf.property,
				value: this.props.data.options.validation.requiredIf.value
			})
			if (this.props.data.options.disabled === true) {
				this.setState({
					disabled: 'true',
				})
			} else {
				this.setState({
					disabled: 'false',
				})
			}
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
			let defaultValue = '';
			let align = '';
			let color = '';
			let required = '';
			let property = '';
			let value = '';

			if (this.state.name != undefined && this.state.label != undefined) {
				name = this.state.name;
				label = this.state.label;
				if (this.state.defaultValue != undefined) {
					defaultValue = this.state.defaultValue;
				}
				if (this.state.align != undefined) {
					align = this.state.align;
				}
				if (this.state.color != undefined) {
					color = this.state.color;
				}
				if (this.state.disabled !== undefined) {
					if (this.state.disabled == 'true') {
						var disabled = true;
					} else {
						var disabled = false;
					}
				}

				if (this.state.required !== undefined) {
					required = this.state.required;
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
						defaultValue,
						align,
						color,
						disabled,
						validation: {
							required,
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
	}

	render() {
		return (
			<Fragment>
				<h5><b>Slide Toggle configuration</b></h5>
				<Input
					s={12}
					label="Element type"
					id="type"
					name="type"
					type="text"
					value="slide-toggle"
					disabled
					required
				/>
				<Input
					className="labelText mb-1"
					s={12}
					label="Name *"
					id="name"
					name="name"
					type="text"
					autoComplete="off"
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
					label="Default value"
					id="defaultValue"
					name="defaultValue"
					type="text"
					value={this.state.defaultValue}
					onChange={this.handleChange}
				/><div className="helper-text" >Provide a default value</div>

				<div><label className="innerDynamicLabel"> Align toggle to... *</label></div>
				<div>
					<input id="after" className="with-gap" name="align" type="radio" value="after" checked={this.state.align === 'after'} onChange={this.handleChange} />
					<label className="innerDynamicLabel ml-1" htmlFor="after">Start</label>
				</div>
				<div>
					<input id="end" className="with-gap" type="radio" name="align" value="before" checked={this.state.align === 'before'} onChange={this.handleChange} />
					<label className="innerDynamicLabel ml-1" htmlFor="end">End</label>
				</div>

				<div><label className="innerDynamicLabel">Color *</label></div>
				<div>
					<input id="accent" className="with-gap" name="color" type="radio" value="accent" checked={this.state.color === "accent"} onChange={this.handleChange} />
					<label className="innerDynamicLabel ml-1" htmlFor="accent">Accent</label>
				</div>
				<div>
					<input id="primary" className="with-gap" type="radio" name="color" value="primary" checked={this.state.color === "primary"} onChange={this.handleChange} />
					<label className="innerDynamicLabel ml-1" htmlFor="primary">Primary</label>
				</div>
				<div>
					<input id="warn" className="with-gap" type="radio" name="color" value="warn" checked={this.state.color === "warn"} onChange={this.handleChange} />
					<label className="innerDynamicLabel ml-1" htmlFor="warn">Warn</label>
				</div>

				<div> <label className="innerDynamicLabel">Default state *</label></div>
				<div>
					<input id="disabled" className="with-gap" name="disabled" type="radio" value={true} checked={this.state.disabled === "true"} onChange={this.handleChange} />
					<label className="innerDynamicLabel ml-1" htmlFor="disabled">Disabled</label>
				</div>
				<div>
					<input id="enabled" className="with-gap" type="radio" name="disabled" value={false} checked={this.state.disabled === "false"} onChange={this.handleChange} />
					<label className="innerDynamicLabel ml-1" htmlFor="enabled">Enabled</label>
				</div>

				<fieldset>
					<legend>Validation</legend>
					<input s={12} type="checkbox" className='filled-in' id="required" name="required" checked={this.state.required} onChange={this.handleChange} />
					<label htmlFor="required">Required?</label>
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
export default SlidertoogleControl;