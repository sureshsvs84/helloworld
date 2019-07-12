import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';
import { flatten } from 'flat';

class RadioControl extends Component {

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
		this.handleCheckChange = this.handleCheckChange.bind(this);
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
				defaultValue: this.props.data.options ? this.props.data.options.defaultValue : '',
				items: this.props.data.options.items ? this.props.data.options.items : '',
				property: this.props.data.options.showIf ? this.props.data.options.showIf.property : '',
				value: this.props.data.options.showIf ? this.props.data.options.showIf.value : ''
			})

			if (this.props.data.options.vertical === true) {
				this.setState({
					vertical: 'true',
				})
			} else {
				this.setState({
					vertical: 'false',
				})
			}
			if (this.props.data.options.disabled === true) {
				this.setState({
					disabled: 'true',
				})
			} else {
				this.setState({
					disabled: 'false',
				})
			}
			if (this.props.data.options.validation.required === true) {
				this.setState({
					required: true,
				})
			} else {
				this.setState({
					required: false,
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
		this.setState({ [name]: value }, () => {
			this.createSchema(); // Call back function as SetState is Asynch
		})
	}
	handleCheckChange(e) {
		// this.setState({required: !this.state.required}); //look at the !NOT sign
		this.setState({ required: !this.state.required }, () => {
			this.viewRadio(); // Call back function as SetState is Asynch
		})
	}
	viewRadio = () => {
		console.log("Required", this.state.required)
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
			if (this.state.vertical !== undefined) {
				if (this.state.vertical == 'true') {
					var vertical = true;
				} else {
					var vertical = false;
				}
			}
			if (this.state.disabled !== undefined) {
				if (this.state.disabled == 'true') {
					var disabled = true;
				} else {
					var disabled = false;
				}
			}
			if (this.state.required !== undefined) {
				if (this.state.required === true) {
					var required = true;
				} else {
					var required = false;
				}
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
				var showIf = { property, value }
			}

			var initialState = {
				type: this.state.type,
				name,
				label,
				options: {
					hint,
					defaultValue,
					showIf,
					vertical,
					disabled,
					validation: {
						required,
					},
					items
				},

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
		const { name, value } = evt.target;
		this.setState({ [name]: value }, () => {
			this.itemSchema(idx); // Call back function as SetState is Asynch
		})
	};
	itemSchema = (idx) => {

		var flattenData = ''
		var item = this.state.items[idx];
		flattenData = flatten(item);

		var itemvalue = this.state[`itemvalue${idx}`] !== undefined ? this.state[`itemvalue${idx}`] : flattenData['value'];
		var itemlabel = this.state[`itemlabel${idx}`] !== undefined ? this.state[`itemlabel${idx}`] : flattenData['label'];
		var element_type = this.state[`element_type${idx}`] !== undefined ? this.state[`element_type${idx}`] : flattenData['options.specify.type'];
		var othername = this.state[`othername${idx}`] !== undefined ? this.state[`othername${idx}`] : flattenData['options.specify.name'];
		var otherlabel = this.state[`otherlabel${idx}`] !== undefined ? this.state[`otherlabel${idx}`] : flattenData['options.specify.label'];
		var otherhint = this.state[`otherhint${idx}`] !== undefined ? this.state[`otherhint${idx}`] : flattenData['options.specify.options.hint'];
		var otherproperty = this.state[`otherproperty${idx}`] !== undefined ? this.state[`otherproperty${idx}`] : flattenData['options.specify.options.validation.requiredIf.property'];
		var othervalue = this.state[`othervalue${idx}`] !== undefined ? this.state[`othervalue${idx}`] : flattenData['options.specify.options.validation.requiredIf.value'];
		//var otherminLength = this.state[`otherminLength${idx}`] !== undefined ? this.state[`otherminLength${idx}`] : flattenData['options.specify.options.validation.minLength'];
		//var othermaxLength = this.state[`othermaxLength${idx}`] !== undefined ? this.state[`othermaxLength${idx}`] : flattenData['options.specify.options.validation.maxLength'];
        
		if (this.state[`otherminLength${idx}`] !== undefined) {
			var otherminLength = parseInt(this.state[`otherminLength${idx}`]);
		}
		if (this.state[`othermaxLength${idx}`] !== undefined) {
			var othermaxLength = parseInt(this.state[`othermaxLength${idx}`]);
		}
		
		
		var initialItemSchema = {
			value: itemvalue,
			label: itemlabel,
			options: {
				specify: {
					type: element_type,
					name: othername,
					label: otherlabel,
					options: {
						hint: otherhint,
						validation: {
							requiredIf: {
								property: otherproperty,
								value: othervalue,
							},
							minLength: otherminLength,
							maxLength: othermaxLength,
						}
					}
				}
			}
		};

		const newItems = this.state.items.map((item, sidx) => {
			if (idx !== sidx) return item;
			return { ...item, ...initialItemSchema };
		});

		this.setState({ items: newItems }, () => {
			this.handleSave(); // Call back function as SetState is Asynch
		})
	}
	handleSave = () => {
		console.log("Items", this.state.items)
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
		var flattenData = '';
		const { data } = this.state;
		return (
			<Fragment>
				<div>
					<div>
						<h5><b>Radio Configuration</b></h5>
					</div>
					<div>
						<Input
							s={12}
							label="Element type"
							id="type"
							name="type"
							type="text"
							value="radio"
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
							<div> <label className="innerDynamicLabel">List will be...*</label></div>
							<div>
								<input id="after" className="with-gap" name="vertical" type="radio" value="true" checked={this.state.vertical === 'true'} onChange={this.handleChange} />
								<label className="innerDynamicLabel ml-1" htmlFor="after">Vertical</label>
							</div>
							<div>
								<input id="end" className="with-gap" type="radio" name="vertical" value="false" checked={this.state.vertical === 'false'} onChange={this.handleChange} />
								<label className="innerDynamicLabel ml-1" htmlFor="end">Horizontal</label>
							</div>
							<div> <label className="innerDynamicLabel">Default state*</label></div>
							<div>
								<input id="primary" className="with-gap" type="radio" name="disabled" value="true" checked={this.state.disabled === 'true'} onChange={this.handleChange} />
								<label className="innerDynamicLabel ml-1" htmlFor="primary">Disabled</label>
							</div>
							<div>
								<input id="accent" className="with-gap" name="disabled" type="radio" value="false" checked={this.state.disabled === 'false'} onChange={this.handleChange} />
								<label className="innerDynamicLabel ml-1" htmlFor="accent">Enabled</label>
							</div>
							<fieldset>
								<legend><b>Validation</b></legend>
								<div>
									<div>
										<input s={12} type="checkbox" className='filled-in' id="required" name="required" checked={this.state.required} onChange={this.handleCheckChange} />
										<label htmlFor="required">Required?</label>
									</div>
								</div>
							</fieldset>
							<div>
								<h6>Items</h6>
							</div>

							{this.state.items.map((item, idx) => {
								flattenData = flatten(item);
								return <fieldset>
									<div className="collection-item">
										<div className="valign-wrapper">
											<Button type='button' className='orgIcon col s12 m2 l2 xl2' name="deleteItem" onClick={this.handleRemoveItem(idx)}>
												<i className="material-icons" title='Delete'>delete</i>
											</Button>
										</div>
										<div className="valign-wrapper">
											<Col s={12} m={6} l={4} xl={12} >
												<Input
													s={8}
													label='Value'
													id={`itemvalue${idx}`}
													name={`itemvalue${idx}`}
													type="text"
													value={flattenData['value']}
													onChange={this.handleItemLabelChange(idx)}
													className="labelText mb-1"
													autoComplete='off'
												/>
											</Col>
										</div>
										<div className="ml-2 helper-text" >The value stored (e.g. 'NJ')</div>
										<div className="valign-wrapper">
											<Col s={12} m={6} l={4} xl={12} >
												<Input
													s={8}
													label='Label'
													id={`itemlabel${idx}`}
													name={`itemlabel${idx}`}
													type="text"
													value={flattenData['label']}
													onChange={this.handleItemLabelChange(idx)}
													className="labelText mb-1"
													autoComplete='off'
												/>
											</Col>
										</div>
										<div className="ml-2 helper-text" >What the user sees (e.g. 'New Jersey')</div>
										<Collapsible accordion={false}>
											<CollapsibleItem header='Options' icon="keyboard_arrow_down">

												<div className="valign-wrapper">
													<div className="helper-text" ><h6>Others Specify</h6></div>
												</div>

												<div className="valign-wrapper">
													<Col s={12} m={6} l={4} xl={12}>
														<select className="col s8 mt-1 ml-1 pl-0 Dropdown" value={flattenData['options.specify.type']} id={`element_type${idx}`} name={`element_type${idx}`} type='select' onChange={this.handleItemLabelChange(idx)} >
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
															id={`othername${idx}`}
															name={`othername${idx}`}
															type="text"
															value={flattenData['options.specify.name']}
															onChange={this.handleItemLabelChange(idx)}
															className="labelText mb-1"
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
															id={`otherlabel${idx}`}
															name={`otherlabel${idx}`}
															type="text"
															value={flattenData['options.specify.label']}
															onChange={this.handleItemLabelChange(idx)}
															className="labelText mb-1"
															autoComplete='off'
														/>
													</Col>
												</div>
												<div className="ml-2 helper-text" >The text the user sees</div>
												<div className="valign-wrapper">
													<div className="helper-text" ><h6><b>Options</b></h6></div>
												</div>
												<div className="valign-wrapper">
													<Col s={12} m={6} l={4} xl={12} >
														<Input
															s={8}
															label='Hint'
															id={`otherhint${idx}`}
															name={`otherhint${idx}`}
															type="text"
															value={flattenData['options.specify.options.hint']}
															onChange={this.handleItemLabelChange(idx)}
															className="labelText mb-1"
															autoComplete='off'
														/>
													</Col>
												</div>
												<div className="ml-2 helper-text" >Give the user a hint</div>
												<fieldset>
													<legend><b>Validation</b></legend>

													<fieldset>
														<legend><b>Required If?</b></legend>
														<div>
															<Input
																s={12}
																label="Property name"
																id={`otherproperty${idx}`}
																name={`otherproperty${idx}`}
																type="text"
																value={flattenData['options.specify.options.validation.requiredIf.property']}
																onChange={this.handleItemLabelChange(idx)}
																className="labelText mb-1"
																autoComplete='off'
															/><div className="helper-text" >Property name of field dependency.</div>
														</div>
														<div>
															<Input
																s={12}
																label="Property value"
																id={`othervalue${idx}`}
																name={`othervalue${idx}`}
																type="text"
																value={flattenData['options.specify.options.validation.requiredIf.value']}
																onChange={this.handleItemLabelChange(idx)}
																className="labelText mb-1"
																autoComplete='off'
															/><div className="helper-text" >Value of dependent field.</div>
														</div>
													</fieldset>
													<div>
														<Input
															s={12}
															label="Minimum length"
															id={`otherminLength${idx}`}
															name={`otherminLength${idx}`}
															type="number"
															value={flattenData['options.specify.options.validation.minLength']}
															onChange={this.handleItemLabelChange(idx)}
															className="labelText mb-1"
														/><div className="helper-text" >The minimum characters that must be entered</div>
													</div>
													<div>
														<Input
															s={12}
															label="Maximum length"
															id={`othermaxLength${idx}`}
															name={`othermaxLength${idx}`}
															type="number"
															value={flattenData['options.specify.options.validation.maxLength']}
															onChange={this.handleItemLabelChange(idx)}
															className="labelText mb-1"
														/><div className="helper-text" >The maximum characters that must be entered</div>
													</div>
												</fieldset>
											</CollapsibleItem>
										</Collapsible>
									</div>
								</fieldset>
							})}
							<div>
								<Col s={12} m={6} l={4} xl={12} >
									<Button type="button" className='btn btn btn_primary otherButtonAddDetUpt iconButton right' name="addOrg" onClick={this.handleAddItem}>
										<i className="material-icons" title='Add Items'>add_circle</i><span>Add Items</span>
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
export default RadioControl;