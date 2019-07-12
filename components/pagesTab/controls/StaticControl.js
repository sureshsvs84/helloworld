import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';
import 'react-trumbowyg/dist/trumbowyg.min.css';
import Trumbowyg from 'react-trumbowyg';

class StaticControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			label: ""
		};
	}
	componentDidMount() {
		if (Object.keys(this.props.data).length > 0) {
			this.setState({
				label: this.props.data.label,
				property: this.props.data.options.showIf ? this.props.data.options.showIf.property : '',
				value: this.props.data.options.showIf ? this.props.data.options.showIf.value : ''
			})
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			data: nextProps.data
		});
	}
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}
	toolChange = (e) => {
		this.setState({ label: e.target.innerHTML });
	}
	handleSubmit = () => {
		const { onChange } = this.props;
		let label = "";
		let property = "";
		let value = "";
		if (this.state.label != undefined && this.state.label != "") {
			label = this.state.label;
			if (this.state.property != undefined)
				property = this.state.property;
			if (this.state.value != undefined)
				value = this.state.value;
			let data = {
				"type": "static",
				"label": label,
				"options": {
					"showIf": {
						"property": property,
						"value": value
					}
				}
			}
			onChange(data, this.props.index);
			alert('Submitted');
			this.props.close();
		}
		else alert("Please fill the mandatory fields");
	}

	render() {
		return (
			<Fragment>
				<h5><b>Static Configuration</b></h5>
				<Input
					s={12}
					label="Element type"
					id="type"
					name="type"
					type="text"
					value="static"
					disabled
					required />
				<label class="innerDynamicLabel" >Label *</label>
				<Trumbowyg id='react-trumbowyg' onChange={this.toolChange} data={this.props.data.label} placeholder='Label' semantic={false}
					buttons={
						[
							['viewHTML'],
							['undo', 'redo'],
							['formatting'],
							['strong', 'em', 'del'],
							['superscript', 'subscript'],
							['link'],
							['insertImage'],
							['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
							['unorderedList', 'orderedList'],
							['horizontalRule'],
							['removeformat'],
							['uploadImage'],
							['fullscreen']
						]
					} />
				<div className="helper-text" >What the user sees</div>
				<div>
				<h5><b>Options</b></h5>
					<fieldset><legend><b>Show If?</b></legend>
						<Input
							s={12}
							className="mb-1 labelText"
							label="Property name"
							id="property"
							name="property"
							type="text"
							value={this.state.property}
							onChange={this.handleChange}
							autoComplete='off' />
						<div className="helper-text" >Property name of field dependency.</div>
						<Input
							s={12}
							className="mb-1 labelText"
							label="Property value"
							id="value"
							name="value"
							type="text"
							value={this.state.value}
							onChange={this.handleChange}
							autoComplete='off' />
						<div className="helper-text" >Value of dependent field.</div>
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
export default StaticControl;