import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem, RadioGroup } from 'react-materialize';
import Slider from '../../../../node_modules/react-materialize/lib/Slider';

class SliderControl extends Component {

	constructor(props) {
		super(props);

		this.state = {
			//data: [],
			maximumValue: 10,
			minimumValue: 0,
			increments: 1,
			thumbLabel: "true",
			vertical: "false",
			invert: "false",
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
				defaultValues: this.props.data.options ? this.props.data.options.defaultValue : '',
				required: this.props.data.options.validation ? this.props.data.options.validation.required : '',
				minimumValue: this.props.data.options.validation ? this.props.data.options.validation.min : 0,
				maximumValue: this.props.data.options.validation ? this.props.data.options.validation.max : 10,
				property: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.property : '',
				propertyValue: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.value : '',
				increments: this.props.data.options ? this.props.data.options.step : 1
			})
			if (this.props.data.options.invert === true) {
				this.setState({
					invert: 'true',
				})
			} else {
				this.setState({
					invert: 'false',
				})
			}
			if (this.props.data.options.vertical === true) {
				this.setState({
					vertical: 'true',
				})
			} else {
				this.setState({
					vertical: 'false',
				})
			}
			if (this.props.data.options.thumbLabel === true) {
				this.setState({
					thumbLabel: 'true',
				})
			} else {
				this.setState({
					thumbLabel: 'false',
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
			let defaultValues = "";
			let minimumValue = "";
			let maximumValue = "";
			let required = "";
			let property = "";
			let propertyValue = "";
			let increments = null;
			
			

			if (this.state.name != undefined && this.state.label != undefined && this.state.minimumValue != undefined && this.state.maximumValue != undefined
				&& this.state.increments != undefined && this.state.thumbLabel != undefined && this.state.vertical != undefined && this.state.invert != undefined) {
				name = this.state.name;
				label = this.state.label;
				minimumValue = parseInt(this.state.minimumValue);
				maximumValue = parseInt(this.state.maximumValue);
				if (this.state.increments != "") {
					increments = parseInt(this.state.increments);
				}
								
                if (this.state.invert !== undefined) {
					if (this.state.invert == 'true') {
						var invert = true;
					} else {
						var invert = false;
					}
				}
				if (this.state.vertical !== undefined) {
					if (this.state.vertical == 'true') {
						var vertical = true;
					} else {
						var vertical = false;
					}
				}
				if (this.state.thumbLabel !== undefined) {
					if (this.state.thumbLabel == 'true') {
						var thumbLabel = true;
					} else {
						var thumbLabel = false;
					}
				}
				if (this.state.defaultValues !== undefined) {
					defaultValues = this.state.defaultValues;
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
					"type": "slider",
					"name": name,
					"label": label,
					"options": {
						"defaultValue": defaultValues,
						"validation": {
							"required": required,
							"min": minimumValue,
							"max": maximumValue,
							"requiredIf": {
								"property": property,
								"value": propertyValue
							}
						},
						"step": increments,
						"thumbLabel": thumbLabel,
						"vertical": vertical,
						"invert": invert,
						"tickInterval": "auto"
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
					<h5><b>Slider configuration</b></h5>
				</div>
				<div>
					<Input
						s={12}
						label="Element type"
						id="Slider"
						name="Slider"
						type="text"
						value="slider"
						disabled
						required
					/>
				</div>
				<div>
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
				</div>
				<div>
					<Input
						s={12}
						label="Label *"
						name="label"
						type="text"
						value={this.state.label}
						required
						onChange={this.handleChange}
						className="mb-1 labelText"
						autoComplete='off'
					/><div className="helper-text" >The text the user sees</div>

				</div>

				<div className="mt-2">
					<h5><b>Options</b></h5>
					<Input
						s={12}
						label="Default value"
						id="defaultValues"
						name="defaultValues"
						type="text"
						value={this.state.defaultValues}
						onChange={this.handleChange}
						className="mb-1 labelText"
						autoComplete='off'
					/><div className="helper-text mb-3">Provide a default value</div>
					<fieldset>
						<legend><b>Validation</b></legend>
						<input s={12} type="checkbox" id="required" checked={this.state.required} className='filled-in' name="required" onChange={this.handleChange} />
						<label htmlFor="required">Required?</label>
						<Input
							s={12}
							label="Minimum value *"
							id="minimumValue"
							name="minimumValue"
							type="number"
							value={this.state.minimumValue}
							onChange={this.handleChange}
							className="mb-1 labelText"
							onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-') && evt.preventDefault()}
						/><div className="helper-text mb-3">The minimum value allowed</div>
						<Input
							s={12}
							label="Maximum value *"
							id="maximumValue"
							name="maximumValue"
							type="number"
							value={this.state.maximumValue}
							onChange={this.handleChange}
							className="mb-1 labelText"
							onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-') && evt.preventDefault()}
						/><div className="helper-text mb-3">The maximum value allowed</div>
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
					<Input
						s={12}
						label="Increment *"
						id="increments"
						name="increments"
						type="number"
						value={this.state.increments}
						onChange={this.handleChange}
						className="mb-1 labelText"
						onKeyDown={(evt) => (evt.key === 'e') && evt.preventDefault()}
					/><div className="helper-text" >Thumb moves in increments of ...</div>
					<div><label className="innerDynamicLabel">Display thumb label? *</label></div>
					<div><input
						id="thumbYes"
						name="thumbLabel"
						type="radio"
						value="true"
						checked={this.state.thumbLabel === 'true'}
						onChange={this.handleChange}
						className="mb-1 with-gap"
					/><label className="innerDynamicLabel ml-1" htmlFor="thumbYes">Yes</label></div>
					<div><input
						id="thumbNo"
						value="false"
						name="thumbLabel"
						type="radio"
						checked={this.state.thumbLabel === 'false'}
						onChange={this.handleChange}
						className="mb-1 with-gap"
					/><label className="innerDynamicLabel ml-1" htmlFor="thumbNo">No</label></div>
					<div><label className="innerDynamicLabel">Orientation *</label></div>
					<div><input
						id="vertical"
						name="vertical"
						type="radio"
						value="true"
						checked={this.state.vertical === 'true'}
						onChange={this.handleChange}
						className="mb-1 with-gap"
					/><label className="innerDynamicLabel ml-1" htmlFor="vertical">Vertical</label></div>
					<div><input
						id="horizontal"
						name="vertical"
						type="radio"
						value="false"
						checked={this.state.vertical === 'false'}
						onChange={this.handleChange}
						className="mb-1 with-gap"
					/><label className="innerDynamicLabel ml-1" htmlFor="horizontal">Horizontal</label></div>
					<div>
						<label className="innerDynamicLabel">Invert slider? *</label></div>
					<div><input
						id="invertYes"
						name="invert"
						type="radio"
						value="true"
						checked={this.state.invert === 'true'}
						onChange={this.handleChange}
						className="mb-1 with-gap"
					/><label className="innerDynamicLabel ml-1" htmlFor="invertYes">Yes</label></div>
					<div><input
						id="invertNo"
						name="invert"
						type="radio"
						value="false"
						checked={this.state.invert === 'false'}
						onChange={this.handleChange}
						className="mb-1 with-gap"
					/><label className="innerDynamicLabel ml-1" htmlFor="invertNo">No</label></div>
					<Input
						s={12}
						label="Tick marks"
						id="tickMarks"
						name="tickMarks"
						type="text"
						value="auto"
						className="mb-1"
						disabled
						required
					/><div className="helper-text mb-1" >Show tick marks along thumb track</div>
					<div className="right valign-wrapper">
						<Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2" onClick={this.handleSubmit}>Submit</Button>
						<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close} >Cancel</Button>
					</div>
				</div>
			</Fragment>
		);
	}
}
export default SliderControl;