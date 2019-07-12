import React, { Component, Fragment } from "react";
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from "react-materialize";
import { flatten } from 'flat';

class CheckgroupControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			align: '',
			disabled: "",
			requiredMin: 0,
			fields: [{ label: "" }]
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
				name: this.props.data.name,
				prevName: this.props.data.name,
				label: this.props.data.label,
				hint: this.props.data.options ? this.props.data.options.hint : '',
				fields: this.props.data.options.fields ? this.props.data.options.fields : '',
				property: this.props.data.options.showIf ? this.props.data.options.showIf.property : '',
				value: this.props.data.options.showIf ? this.props.data.options.showIf.value : '',
				requiredMin: this.props.data.options.validation ? this.props.data.options.validation.requiredMin : ''
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
		const { name, value } = e.target;
		this.setState({ [name]: value }, () => {
			this.createSchema(); // Call back function as SetState is Asynch
		})
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
			let name = '';
			let label = '';
			let hint = '';
			let requiredMin = '';
			let fields = [];
			let property = '';
			let value = '';

			if (this.state.name !== undefined && this.state.label !== undefined) {
				name = this.state.name;
				label = this.state.label
				if (this.state.hint != undefined) {
					hint = this.state.hint;
				}
				if (this.state.requiredMin !== undefined) {
					requiredMin = parseInt(this.state.requiredMin);
				}
				if (this.state.fields !== undefined) {
					fields = this.state.fields;
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
						showIf: {
							property,
							value
						},
						validation: {
							requiredMin,
						},
						fields
					},
				};
				alert('submitted');
				onChange(initialState, this.props.index);
				this.props.close();
			}
			else alert("Enter required fields");
		}
		else {
			alert("Name already exists");
			nameExists = "";
		}
	}
	handleItemLabelChange = idx => evt => {
		const { name, value } = evt.target;

		this.setState({ [name]: value }, () => {
			this.itemSchema(idx); // Call back function as SetState is Asynch
		})
		if (evt.target.type === "checkbox")
			this.setState({
				[evt.target.name]: evt.target.checked
			}, () => {
				this.itemSchema(idx); // Call back function as SetState is Asynch
			})
	};

	itemSchema = (idx) => {
		var flattenData = ''
		var field = this.state.fields[idx];
		flattenData = flatten(field);

		var itemType = this.state[`element_typeCheckbox${idx}`] !== undefined ? this.state[`element_typeCheckbox${idx}`] : flattenData['type']
		var fieldName = this.state[`fieldName${idx}`] !== undefined ? this.state[`fieldName${idx}`] : flattenData['name'];
		var fieldLabel = this.state[`fieldLabel${idx}`] !== undefined ? this.state[`fieldLabel${idx}`] : flattenData['label'];
		var element_typeText = this.state[`element_typeText${idx}`] !== undefined ? this.state[`element_typeText${idx}`] : flattenData['options.specify.type'];
		var othername = this.state[`othername${idx}`] !== undefined ? this.state[`othername${idx}`] : flattenData['options.specify.name'];
		var otherlabel = this.state[`otherlabel${idx}`] !== undefined ? this.state[`otherlabel${idx}`] : flattenData['options.specify.label'];
		var otherhint = this.state[`otherhint${idx}`] !== undefined ? this.state[`otherhint${idx}`] : flattenData['options.specify.options.hint'];
		var otherproperty = this.state[`otherproperty${idx}`] !== undefined ? this.state[`otherproperty${idx}`] : flattenData['options.specify.options.validation.requiredIf.property'];
		var othervalue = this.state[`othervalue${idx}`] !== undefined ? this.state[`othervalue${idx}`] : flattenData['options.specify.options.validation.requiredIf.value'];
		var required = this.state[`required${idx}`] !== undefined ? this.state[`required${idx}`] : flattenData['validation.required']
		var align = this.state[`align${idx}`] !== undefined ? this.state[`align${idx}`] : flattenData['options.align']
		//var disabled = this.state[`disabled${idx}`] !== undefined ? this.state[`disabled${idx}`] : flattenData['options.disabled']
		//var booldisabled = JSON.parse(disabled);   //returns true
        
		if (this.state[`disabled${idx}`] !== undefined) {
				if (this.state[`disabled${idx}`] == 'true') {
					var disabled = true;
				} else {
					var disabled = false;
				}
			}
		
		
		
		var initialItemSchema = {
			type: itemType,
			name: fieldName,
			label: fieldLabel,
			options: {
				align: align,
				disabled: disabled,
				specify: {
					type: element_typeText,
					name: othername,
					label: otherlabel,
					options: {
						hint: otherhint,
						validation: {
							requiredIf: {
								property: otherproperty,
								value: othervalue,
							},
						}
					}
				},
				validation: {
					required: required
				}
			}
			
		};

		const newItems = this.state.fields.map((field, sidx) => {
			if (idx !== sidx) return field;
			return { ...field, ...initialItemSchema };
		});

		this.setState({ fields: newItems })
	}
	handleAddItem = () => {
		this.setState({
			fields: this.state.fields.concat([{ label: "" }])
		});
	};
	handleRemoveItem = idx => () => {
		this.setState({
			fields: this.state.fields.filter((s, sidx) => idx !== sidx)
		});
	};

	render() {
		var flattenData = '';
		return (
			<Fragment>
				<div>
					<div>
						<h5><b>Checkbox group Configuration</b></h5>
					</div>
					<div>
						<Input
							s={12}
							label="Element type"
							id="type"
							name="type"
							type="text"
							value="checkbox-group"
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
							className="labelText"
							autoComplete="off"
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
							className="labelText"
							autoComplete="off"
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
									className="labelText"
									autoComplete="off"
								/><div className="helper-text" >Give user a hint</div>
							</div>
							<fieldset>
								<legend><b>Show If?</b></legend>
								<div>
									<Input
										s={12}
										label="Property name"
										id="property"
										name="property"
										type="text"
										value={this.state.property}
										onChange={this.handleChange}
										className="labelText"
										autoComplete="off"
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
										className="labelText"
										autoComplete="off"
									/><div className="helper-text" >Value of dependent field.</div>
								</div>
							</fieldset>
							<fieldset>
								<legend><b>Validation</b></legend>
								<div className="helper-text" >Require at least this many to be checked:</div>
								<div>
									<Input
										s={12}
										id="requiredMin"
										name="requiredMin"
										type="number"
										value={this.state.requiredMin}
										onChange={this.handleChange}
										className="labelText"
										autoComplete="off"
									/>
								</div>
							</fieldset>
							<div>
								<h6>Fields</h6>
							</div>
							{this.state.fields.map((field, idx) => {
								flattenData = flatten(field);
								return <fieldset>
									<div className="collection-item">
										<div className="valign-wrapper">

											<button type='button' className='col s12 m4 l4 xl4 mt-1' name="deleteItem"
												onClick={this.handleRemoveItem(idx)}
												style={{ backgroundColor: 'unset', border: 'unset', color: '#004e92' }}
											>
												<i className="material-icons" title='Delete'>delete</i>
											</button>

										</div>
										<div>
											<label className="ml-2">Element Type</label>
											<select
												value={flattenData['type']}
												id={`element_typeCheckbox${idx}`} name={`element_typeCheckbox${idx}`} type='select'
												onChange={this.handleItemLabelChange(idx)}
											>
												<option value='' >Element Type</option>
												<option value='checkbox' >checkbox</option>
											</select>
										</div>
										<div>
											<Input
												s={12}
												label={`Name *${idx + 1}`}
												id={`fieldName${idx}`}
												name={`fieldName${idx}`}
												type="text"
												value={flattenData['name']}
												required
												onChange={this.handleItemLabelChange(idx)}
												className="labelText"
												autoComplete="off"
											/><div className="helper-text" >A unique element name</div>
										</div>
										<div>
											<Input
												s={12}
												label={`Label *${idx + 1}`}
												id={`fieldLabel${idx}`}
												name={`fieldLabel${idx}`}
												type="text"
												value={flattenData['label']}
												required
												onChange={this.handleItemLabelChange(idx)}
												className="labelText"
												autoComplete="off"
											/><div className="helper-text" >The text the user sees</div>
										</div>
										<Collapsible accordion={false}>
											<CollapsibleItem header='Options' icon="keyboard_arrow_down">
												<div><label className="innerDynamicLabel"> Align box to... </label></div>
												<div>
													<input id={`start${idx}`} name={`align${idx}`} type="radio" value="start"
														checked={flattenData['options.align'] === 'start'}
														onChange={this.handleItemLabelChange(idx)}
													/>
													<label className="innerDynamicLabel ml-1" htmlFor={`start${idx}`}>Start</label>
												</div>
												<div>
													<input id={`end${idx}`} type="radio" name={`align${idx}`} value="end"
														checked={flattenData['options.align'] === 'end'}
														onChange={this.handleItemLabelChange(idx)}
													/>
													<label className="innerDynamicLabel ml-1" htmlFor={`end${idx}`}>End</label>
												</div>

												<div> <label className="innerDynamicLabel">Default state </label></div>
												
												<div>
													<input id={`disabled${idx}`} type="radio" name={`disabled${idx}`} value="true" checked={flattenData['options.disabled'] === true} onChange={this.handleItemLabelChange(idx)} />
													<label className="innerDynamicLabel ml-1" htmlFor={`disabled${idx}`}>Disabled</label>
												</div>
												<div>
													<input id={`enabled${idx}`} name={`disabled${idx}`} type="radio" value="false" checked={flattenData['options.disabled'] === false} onChange={this.handleItemLabelChange(idx)} />
													<label className="innerDynamicLabel ml-1" htmlFor={`enabled${idx}`}>Enabled</label>
												</div>
												
												
												
												
												<Collapsible accordion={false}>
													<CollapsibleItem header='Others Specify' icon="keyboard_arrow_down">

														<label className="ml-2">Element Type</label>
														<select
															value={flattenData['options.specify.type']}
															id={`element_typeText${idx}`} name={`element_typeText${idx}`} type='select'
															onChange={this.handleItemLabelChange(idx)}
														>
															<option value='' >Element Type</option>
															<option value='text' >Text</option>
														</select>
														<div>
															<Input
																s={12}
																label="Name "
																id={`othername${idx}`}
																name={`othername${idx}`}
																type="text"
																value={flattenData['options.specify.name']}
																onChange={this.handleItemLabelChange(idx)}
																className="labelText"
																autoComplete="off"
															/><div className="helper-text" >A unique element name</div>
														</div>
														<div>
															<Input
																s={12}
																label="Label "
																id={`otherlabel${idx}`}
																name={`otherlabel${idx}`}
																type="text"
																value={flattenData['options.specify.label']}
																onChange={this.handleItemLabelChange(idx)}
																className="labelText"
																autoComplete="off"
															/><div className="helper-text" >The text the user sees</div>
														</div>
														<Collapsible accordion={false}>
															<CollapsibleItem header='Options' icon="keyboard_arrow_down">
																<div className="valign-wrapper">
																	<Input
																		s={12}
																		label="Hint"
																		id={`otherhint${idx}`}
																		name={`otherhint${idx}`}
																		type="text"
																		value={flattenData['options.specify.options.hint']}
																		onChange={this.handleItemLabelChange(idx)}
																		className="labelText"
																		autoComplete='off'
																	/>	</div>
																<div className="helper-text" >Give user a hint</div>
																<fieldset>
																	<legend>Required If?</legend>
																	<Input
																		className="labelText mb-1"
																		s={12}
																		autoComplete="off"
																		label="Property name"
																		id={`otherproperty${idx}`}
																		name={`otherproperty${idx}`}
																		type="text"
																		value={flattenData['options.specify.options.validation.requiredIf.property']}
																		onChange={this.handleItemLabelChange(idx)}
																	/><div className="helper-text" >Property name of field dependency</div>
																	<Input
																		className="labelText mb-1"
																		s={12}
																		autoComplete="off"
																		label="Property value"
																		id={`othervalue${idx}`}
																		name={`othervalue${idx}`}
																		type="text"
																		value={flattenData['options.specify.options.validation.requiredIf.value']}
																		onChange={this.handleItemLabelChange(idx)}
																	/><div className="helper-text" >Value of dependent field</div>
																</fieldset>
															</CollapsibleItem>
														</Collapsible>
													</CollapsibleItem>
												</Collapsible>
												<fieldset>
													<legend>Validation</legend>
													<input s={12} type="checkbox" className='filled-in' id={`required${idx}`} name={`required${idx}`}
														checked={flattenData['validation.required']} onChange={this.handleItemLabelChange(idx)}
													/>
													<label htmlFor={`required${idx}`}>Required?</label>
												</fieldset>
											</CollapsibleItem>
										</Collapsible>
									</div>
								</fieldset>
							})}
							<div>
								<Col s={12} m={6} l={4} xl={12} >
									<Button type="button" className='btn btn_primary otherButtonAddDetUpt iconButton right' name="addOrg" onClick={this.handleAddItem}>
										<i className="material-icons" title='Add Fields'>add_circle</i><span>Add Fields</span>
									</Button>
								</Col>
							</div>
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
export default CheckgroupControl;
