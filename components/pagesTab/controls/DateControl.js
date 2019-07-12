import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';

class DateControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			required: false,
			month1: "",
			month2: "",
			month3: "",
			dateError1: false,
			dateError2: false,
			dateError3: false,
			// data: [],
			month: [
				{
					value: '0',
					label: 'January'
				},
				{
					value: '1',
					label: 'February'
				},
				{
					value: '2',
					label: 'March'
				},
				{
					value: '3',
					label: 'April'
				},
				{
					value: '4',
					label: 'May'
				},
				{
					value: '5',
					label: 'June'
				},
				{
					value: '6',
					label: 'July'
				},
				{
					value: '7',
					label: 'August'
				},
				{
					value: '8',
					label: 'September'
				},
				{
					value: '9',
					label: 'October'
				},
				{
					value: '10',
					label: 'November'
				},
				{
					value: '11',
					label: 'December'
				}
			]
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
				property1: this.props.data.options.showIf ? this.props.data.options.showIf.property : '',
				value1: this.props.data.options.showIf ? this.props.data.options.showIf.value : '',
				year1: this.props.data.options.startAt ? this.props.data.options.startAt.year : '',
				month1: this.props.data.options.startAt ? this.props.data.options.startAt.month : '',
				day1: this.props.data.options.startAt ? this.props.data.options.startAt.day : '',
				required: this.props.data.options.validation ? this.props.data.options.validation.required : '',
				year2: this.props.data.options.validation.minDate ? this.props.data.options.validation.minDate.year : '',
				month2: this.props.data.options.validation.minDate ? this.props.data.options.validation.minDate.month : '',
				day2: this.props.data.options.validation.minDate ? this.props.data.options.validation.minDate.day : '',
				year3: this.props.data.options.validation.maxDate ? this.props.data.options.validation.maxDate.year : '',
				month3: this.props.data.options.validation.maxDate ? this.props.data.options.validation.maxDate.month : '',
				day3: this.props.data.options.validation.maxDate ? this.props.data.options.validation.maxDate.day : '',
				property2: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.property : '',
				value2: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.value : ''
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
		if (e.target.id == "day1") {
			if (parseInt(e.target.value) > 31)
				this.setState({ dateError1: true });
			else this.setState({ dateError1: false });
		}
		if (e.target.id == "day2") {
			if (parseInt(e.target.value) > 31)
				this.setState({ dateError2: true });
			else this.setState({ dateError2: false });
		}
		if (e.target.id == "day3") {
			if (parseInt(e.target.value) > 31)
				this.setState({ dateError3: true });
			else this.setState({ dateError3: false });
		}
		if (e.target.type == "checkbox")
			this.setState({ [e.target.name]: e.target.checked });
	};
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
			let property1 = "";
			let value1 = "";
			let year1 = null;
			let month1 = "";
			let day1 = null;
			let required = "";
			let year2 = null;
			let month2 = "";
			let day2 = null;
			let year3 = null;
			let month3 = "";
			let day3 = null;
			let property2 = "";
			let value2 = "";
			if (this.state.name != undefined && this.state.label != undefined) {
				name = this.state.name;
				label = this.state.label;
				if (this.state.hint != undefined)
					hint = this.state.hint;
				if (this.state.defaultValue != undefined)
					defaultValue = this.state.defaultValue;
				if (this.state.property1 != undefined)
					property1 = this.state.property1;
				if (this.state.value1 != undefined)
					value1 = this.state.value1;
				if (this.state.year1 != undefined) {
					if (this.state.year1 != "")
						year1 = this.state.year1;
				}
				if (this.state.month1 != undefined)
					month1 = this.state.month1;
				if (this.state.day1 != undefined) {
					if (this.state.day1 != "")
						day1 = this.state.day1;
				}
				if (this.state.required != undefined)
					required = this.state.required;
				if (this.state.year2 != undefined) {
					if (this.state.year2 != "")
						year2 = this.state.year2;
				}
				if (this.state.month2 != undefined)
					month2 = this.state.month2;
				if (this.state.day2 != undefined) {
					if (this.state.day2 != "")
						day2 = this.state.day2;
				}
				if (this.state.year3 != undefined) {
					if (this.state.year3 != "")
						year3 = this.state.year3;
				}
				if (this.state.month3 != undefined)
					month3 = this.state.month3;
				if (this.state.day3 != undefined) {
					if (this.state.day3 != "")
						day3 = this.state.day3;
				}
				if (this.state.property2 != undefined)
					property2 = this.state.property2;
				if (this.state.value2 != undefined)
					value2 = this.state.value2;
				let data = {
					"type": "date",
					"name": name,
					"label": label,
					"options": {
						"hint": hint,
						"defaultValue": defaultValue,
						"showIf": {
							"property": property1,
							"value": value1
						},
						"startAt": {
							"year": year1,
							"month": month1,
							"day": day1
						},
						"validation": {
							"required": required,
							"minDate": {
								"year": year2,
								"month": month2,
								"day": day2
							},
							"maxDate": {
								"year": year3,
								"month": month3,
								"day": day3
							},
							"requiredIf": {
								"property": property2,
								"value": value2
							}
						}
					}
				};
				if (this.state.dateError1 == false && this.state.dateError2 == false && this.state.dateError3 == false) {
					onChange(data, this.props.index);
					alert('Submitted');
					this.props.close();
				}
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
				<div className="mt-5">
					<h5><b>Date Configuration</b></h5>
					<Input
						s={12}
						label="Element type"
						name="type"
						value="date"
						disabled
						required
					/>
					<Input
						s={12}
						label="Name *"
						id="name"
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
				</div>
				<div>
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
					/><div className="helper-text" >Give user a hint</div>
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
					/><div className="helper-text mb-3">Provide a default value (ISO date format)</div>
					<fieldset>
						<legend><b>Show If?</b></legend>
						<Input
							s={12}
							label="Property name"
							id="property1"
							name="property1"
							type="text"
							value={this.state.property1}
							onChange={this.handleChange}
							className="mb-1 labelText"
							autoComplete='off'
						/><div className="helper-text" >Property name of field dependency.</div>
						<Input
							s={12}
							label="Property value"
							id="value1"
							name="value1"
							type="text"
							value={this.state.value1}
							onChange={this.handleChange}
							className="mb-1 labelText"
							autoComplete='off'
						/><div className="helper-text" >Value of dependent field.</div>
					</fieldset>
					<div>
						<label>Start date</label>
						<Input
							s={12}
							label="Year"
							id="year1"
							name="year1"
							type="number"
							onChange={this.handleChange}
							className="mb-1 labelText"
							value={this.state.year1}
							onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-' || evt.key === '.') && evt.preventDefault()}
						/><div className="helper-text" >The start year</div>
						<label class="ml-2">Month</label>
						<select id="month1" name='month1' className="mb-1" onChange={this.handleChange} value={this.state.month1} style={{ paddingLeft: '8px' }} >
							<option value="" disabled >Choose month</option>
							{this.state.month.map(interval => {
								return <option value={interval.value}>{interval.label}</option>
							})}
						</select>
						<div className="helper-text" >The start month</div>
						<Input
							s={12}
							label="Day"
							id="day1"
							name="day1"
							type="number"
							onChange={this.handleChange}
							className="mb-1 labelText"
							value={this.state.day1}
							onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-' || evt.key === '.') && evt.preventDefault()}
						/><div className="helper-text" >The start day</div>
						{this.state.dateError1 == true ?
							<p className="errorMessage m-0 pl-1">Day must be not more than 31.</p> : null}
					</div>
					<fieldset>
						<legend><b>Validation</b></legend>
						<input s={12} type="checkbox" id="required" name="required" className='filled-in' checked={this.state.required} onChange={this.handleChange} />
						<label htmlFor="required">Required?</label>
						<div>
							<label>Minimum date</label>
							<Input
								s={12}
								label="Year"
								id="year2"
								name="year2"
								type="number"
								onChange={this.handleChange}
								className="mb-1 labelText"
								value={this.state.year2}
								onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-' || evt.key === '.') && evt.preventDefault()}
							/><div className="helper-text" >The minimum date year</div>
							<label className="ml-2">Month</label>
							<select id="month2" name='month2' className="mb-1" onChange={this.handleChange} value={this.state.month2} style={{ paddingLeft: '8px' }}>
								<option value="" disabled >Choose month</option>
								{this.state.month.map(iterval => {
									return <option value={iterval.value}>{iterval.label}</option>
								})}
							</select>
							<div className="helper-text" >The minimum date month</div>
							<Input
								s={12}
								label="Day"
								id="day2"
								name="day2"
								type="number"
								onChange={this.handleChange}
								className="mb-1 labelText"
								value={this.state.day2}
								onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-' || evt.key === '.') && evt.preventDefault()}
							/><div className="helper-text" >The minimum date day</div>
							{this.state.dateError2 == true ?
								<p className="errorMessage m-0 pl-1">Day must be not more than 31.</p> : null}
						</div>
						<div>
							<label>Maximum date</label>
							<Input
								s={12}
								label="Year"
								id="year3"
								name="year3"
								type="number"
								onChange={this.handleChange}
								className="mb-1 labelText"
								value={this.state.year3}
								onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-' || evt.key === '.') && evt.preventDefault()}
							/><div className="helper-text" >The maximum date year</div>
							<label className="ml-2">Month</label>
							<select id="month3" name='month3' className="mb-1" onChange={this.handleChange} value={this.state.month3} style={{ paddingLeft: '8px' }}>
								<option value="" disabled >Choose month</option>
								{this.state.month.map(iterval => {
									return <option value={iterval.value}>{iterval.label}</option>
								})}
							</select>
							<div className="helper-text" >The maximum date month</div>
							<Input
								s={12}
								label="Day"
								id="day3"
								name="day3"
								type="number"
								onChange={this.handleChange}
								className="mb-1 labelText"
								value={this.state.day3}
								onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-' || evt.key === '.') && evt.preventDefault()}
							/><div className="helper-text" >The maximum date day</div>
							{this.state.dateError3 == true ?
								<p className="errorMessage m-0 pl-1">Day must be not more than 31.</p> : null}
						</div>
						<fieldset>
							<legend><b>Required If?</b></legend>
							<Input
								s={12}
								label="Property name"
								id="property2"
								name="property2"
								type="text"
								value={this.state.property2}
								onChange={this.handleChange}
								className="mb-1 labelText"
								autoComplete='off'
							/><div className="helper-text" >Property name of field dependency.</div>
							<Input
								s={12}
								label="Property value"
								id="value2"
								name="value2"
								type="text"
								value={this.state.value2}
								onChange={this.handleChange}
								className="mb-1 labelText"
								autoComplete='off'
							/><div className="helper-text" >Value of dependent field.</div>
						</fieldset>
					</fieldset>
				</div>
				<div className="pt-2 right valign-wrapper" >
					<Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2" onClick={this.handleSubmit}>Submit</Button>
					<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close}>Cancel</Button>
				</div>
			</Fragment>
		);
	}
}
export default DateControl;