import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';

class ButtonControl extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			name: '',
			label: '',
			disabled: "false"
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this)
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
				disabled: this.props.data.disabled
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
		this.setState({ [name]: value })
	}
	handleRadioChange = (e) => {
		this.setState({
			disabled: e.target.value
		})
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
			if (this.state.name !== undefined) {
				var name = this.state.name
			}
			if (this.state.label !== undefined) {
				var label = this.state.label
			}
			if (this.state.disabled != undefined) {
				var disabled = this.state.disabled;
			}
			var initialState = {
				type: "button",
				name,
				label,
				options: {
				disabled
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
	};

	render() {
		return (
			<Fragment>
				<div>
					<h5><b>Button Configuration</b></h5>
				</div>
				<div>
					<Input
						s={12}
						label="Element type"
						id="type"
						name="type"
						type="text"
						value="button"
						className="labelText"
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
					/><div className="helper-text" >The text the user sees</div>
				</div>
				<h5><b>Options</b></h5>
				<Row>
					<Col>
						<div>
							<label className="innerDynamicLabel" style={{ paddingLeft: "unset" }}>Disabled by default *</label>
							{/* <Input
													className="with-gap"
													s={12}
													label="yes"
													id="yes"
													type="radio"
													value="true"
													checked={this.state.disabled == "true"}
													onChange={this.handleRadioChange}
												/>
												<Input
													s={12}
													className="with-gap"
													label="no"
													id="no"
													type="radio"
													value="false"
													checked={this.state.disabled == "false"}
													onChange={this.handleRadioChange}
												/> */}

							<div>
								<input name='disabled' className="with-gap" value="true" type='radio' checked={this.state.disabled == "true"} id='dTrue' onChange={this.handleChange} />
								<label className="innerDynamicLabel ml-1" htmlFor='dTrue'>Yes</label>
							</div>
							<div>
								<input name='disabled' className="with-gap" value="false" type='radio' checked={this.state.disabled == "false"} id='dFalse' onChange={this.handleChange} />
								<label className="innerDynamicLabel ml-1" htmlFor='dFalse'>No</label>
							</div>
						</div>
					</Col>
				</Row>
				<div className="right valign-wrapper">
					<Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2" onClick={this.handleSubmit}>Submit</Button>
					<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close} >Cancel</Button>
				</div>
			</Fragment>
		);
	}
}
export default ButtonControl;