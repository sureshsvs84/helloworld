import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';

class TextControl extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			name: '',
			label: '',
			name: "",
			items: [{ label: "" }]
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		//alert('did')
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
				autocomplete: this.props.data.options ? this.props.data.options.autocomplete : '',
				items: this.props.data.options.items ? this.props.data.options.items : '',
				required: this.props.data.options.validation ? this.props.data.options.validation.required : '',
				minLength: this.props.data.options.validation ? this.props.data.options.validation.minLength : '',
				maxLength: this.props.data.options.validation ? this.props.data.options.validation.maxLength : '',
				pattern: this.props.data.pattern,
				patternValMsg: this.props.data.patternValMsg,
				property: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.property : '',
				value: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.value : ''
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		// alert('will')
		this.setState({
			mode: nextProps.mode,
			type: nextProps.type,
			data: nextProps.data,
		});
	}
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		if (e.target.type === "checkbox")
			this.setState({ [e.target.name]: e.target.checked });
	}
	createSchema() {
		//onChange(index,initialState);
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
			if (this.state.name !== undefined) {
				var name = this.state.name
			}
			if (this.state.label !== undefined) {
				var label = this.state.label
			}
			if (this.state.hint != undefined) {
				var hint = this.state.hint;
			}
			if (this.state.defaultValue != undefined) {
				var defaultValue = this.state.defaultValue;
			}
			if (this.state.autocomplete !== undefined) {
				var autocomplete = this.state.autocomplete;
			}
			if (this.state.required !== undefined) {
				var required = this.state.required;
			}
			if (this.state.items !== undefined) {
				//var items = [{ label: this.state.label_0 },{ label: this.state.label_1 }]
				var items = this.state.items;

			}
			if (this.state.minLength !== undefined) {
				var minLength = parseInt(this.state.minLength);
			}
			if (this.state.maxLength !== undefined) {
				var maxLength = parseInt(this.state.maxLength);
			}
			if (this.state.property !== undefined) {
				var property = this.state.property;
			}
			if (this.state.value !== undefined) {
				var value = this.state.value;
			}
			if (this.state.property !== undefined || this.state.value !== undefined) {
				var requiredIf = { property, value }
			}

			var initialState = {
				type: this.state.type,
				name,
				label,
				options: {
					hint,
					defaultValue,
					autocomplete,
					items,
					validation: {
						required,
						minLength,
						maxLength,
						requiredIf
					}
				}
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

	handleItemLabelChange = idx => evt => {
		const newItems = this.state.items.map((item, sidx) => {
			if (idx !== sidx) return item;
			return { ...item, label: evt.target.value };
		});


		this.setState({ items: newItems }, () => {
			this.handleSave(); // Call back function as SetState is Asynch
		})
	};

	handleSave = () => {
		//console.log("Items",this.state.items)
	}

	handleAddItem = () => {
		this.setState({
			items: this.state.items.concat([{ label: "" }])
		});
	};

	handleRemoveItem = idx => () => {
		this.setState({
			items: this.state.items.filter((s, sidx) => idx !== sidx)
		});
	};

	render() {

		const { data } = this.state;

		var requiredfields = '';
		//{data.items.map(itemval => {
		//          return  <div>
		//										<div className="helper-text" >{itemval.label}</div>
		//										 </div>

		//     })}
		return (
			<Fragment>
				<div>
					<div>
						<h5><b>Text Configuration</b></h5>
					</div>
					<div>
						<Input
							s={12}
							label="Element type"
							id="type"
							name="type"
							type="text"
							value="text"
							disabled
							required
							className="labelText"
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
							value={this.state.label}
							required
							onChange={this.handleChange}
							className="labelText mb-1"
							autoComplete='off'
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
									autoComplete='off'
								/><div className="helper-text" >Give user a hint</div>
							</div>
							<div>
								<Input
									s={12}
									label="Default value"
									id="defaultValue"
									name="defaultValue"
									type="text"
									value={this.state.defaultValue}
									onChange={this.handleChange}
									className="labelText mb-1"
									autoComplete='off'
								/><div className="helper-text" >Provide a default value</div>
							</div>
							<div className="pl-2">
								<input s={12} type="checkbox" id="autocomplete" name="autocomplete" className='filled-in' onChange={this.handleChange} checked={this.state.autocomplete} />
								<label htmlFor="autocomplete">Autocomplete?</label>
							</div>
							<div className="pl-2">
								<h6>Autocomplete items</h6>
							</div>
							<div className="helper-text" >Enter items</div>
							{this.state.items.map((item, idx) => (
								<div className="shareholder pl-2">
									<div class="valign-wrapper">
										<input
											type="text"
											placeholder={`Label #${idx + 1}`}
											value={item.label}
											className='col s12 m8 l8 xl8 labelText mb-1'
											onChange={this.handleItemLabelChange(idx)}
											autoComplete='off'
										/>
										<button type='button' className='btn btn btn_primary otherButtonAddDetUpt iconButton col s12 m4 l4 xl4 mt-1' name="deleteOrg"
											onClick={this.handleRemoveItem(idx)}
										>
											<i className="material-icons" title='Delete Item'>delete</i><span>Delete Item</span>
										</button>

									</div>
									<div className="helper-text pl-0" >Enter value</div>
								</div>
							))}
							<div>
								<Col s={12} m={6} l={4} xl={12} >
									<Button type="button" className='btn btn btn_primary otherButtonAddDetUpt iconButton col s12 m4 l4 xl4 right'
										name="addOrg" onClick={this.handleAddItem} style={{ textAlign: "right" }}>
										<i className="material-icons" title='Add Items'>add_circle</i><span>Add Items</span>
									</Button>
								</Col>
							</div>
							<fieldset>
								<legend><b>Validation</b></legend>
								<div>
									<div>
										<input s={12} type="checkbox" id="required" name="required" className='filled-in' onChange={this.handleChange} checked={this.state.required} />
										<label htmlFor="required">Required?</label>
									</div>
								</div>

								<div>
									<div>
										<Input
											s={12}
											label="Minimum length"
											id="minLength"
											name="minLength"
											type="number"
											value={this.state.minLength}
											onChange={this.handleChange}
											className="labelText mb-1"
										/><div className="helper-text" >The minimum characters that must be entered</div>
									</div>
									<div>
										<Input
											s={12}
											label="Maximum length"
											id="maxLength"
											name="maxLength"
											type="number"
											value={this.state.maxLength}
											onChange={this.handleChange}
											className="labelText mb-1"
										/><div className="helper-text" >The maximum characters that must be entered</div>
									</div>
									<fieldset>
										<legend><b>Required If?</b></legend>
										<div>
											<Input
												s={12}
												label="Property name"
												id="property"
												name="property"
												type="text"
												value={this.state.property}
												onChange={this.handleChange}
												className="labelText mb-1"
												autoComplete='off'
											/><div className="helper-text" >Property name of field dependency.</div>
										</div>
										<div>
											<Input
												s={12}
												label="Property value"
												id="value"
												name="value"
												type="text"
												value={this.state.value}
												onChange={this.handleChange}
												className="labelText mb-1"
												autoComplete='off'
											/><div className="helper-text" >Value of dependent field.</div>
										</div>
									</fieldset>
								</div>
							</fieldset>
						</div>

					</div>

				</div>
				<div className="right valign-wrapper mt-2">
					<Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2" onClick={this.handleSubmit}>Submit</Button>
					<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close} >Cancel</Button>

				</div>

			</Fragment>
		);
	}
}
export default TextControl;