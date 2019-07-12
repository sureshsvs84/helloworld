import React, { Component, Fragment } from "react";
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';

class ActionControl extends Component {

	constructor(props) {
		super(props);

		this.state = {
			deleteText: 'Delete',
			cancelText: 'Cancel',
			submitText: 'Submit',
			cancel: true,
			submit: true,
			deleted: false
		};
	}

	componentDidMount = () => {
		this.setState({
			mode: this.props.mode,
			type: this.props.type,
			data: this.props.data,
		});
		if (Object.keys(this.props.data).length > 0) {
			this.setState({
				deleted: this.props.data.options.buttons ? this.props.data.options.buttons.allowDelete : false,
				deleteText: this.props.data.options.buttons ? this.props.data.options.buttons.deleteButtonText : null,
				cancel: this.props.data.options.buttons ? this.props.data.options.buttons.allowCancel : true,
				cancelText: this.props.data.options.buttons ? this.props.data.options.buttons.cancelButtonText : null,
				submit: this.props.data.options.buttons ? this.props.data.options.buttons.allowSubmit : true,
				submitText: this.props.data.options.buttons ? this.props.data.options.buttons.submitButtonText : null
			})
		}
	}
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			mode: nextProps.mode,
			type: nextProps.type,
			data: nextProps.data,
		});
	}
	handleSubmit = () => {
		const { onChange } = this.props;
		let deleted = "";
		let deleteText = "";
		let cancel = "";
		let cancelText = "";
		let submit = "";
		let submitText = "";

		if (this.state.deleted != false || this.state.cancel != false || this.state.submit != false) {
			deleted = this.state.deleted;
			cancel = this.state.cancel;
			submit = this.state.submit;
			if (this.state.deleteText !== undefined) {
				deleteText = this.state.deleteText;
			}
			if (this.state.cancelText !== undefined) {
				cancelText = this.state.cancelText
			}
			if (this.state.submitText !== undefined) {
				submitText = this.state.submitText;
			}
			let data = {
				"type": "action-toolbar",
				"options": {
					"buttons": {
						"allowDelete": deleted,
						"deleteButtonText": deleteText,
						"allowCancel": cancel,
						"cancelButtonText": cancelText,
						"allowSubmit": submit,
						"submitButtonText": submitText
					}
				}
			};
			onChange(data, this.props.index);
			alert('Submitted');
			this.props.close();
		}
		else {
			alert("Enter required fields");
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
					<h5><b>ActionToolbar Configuration</b></h5>
				</div>
				<Input
					s={12}
					label="Element type"
					id="type"
					name="type"
					type="text"
					value="action-toolbar"
					disabled
					required
				/>
				<h5><b>Options</b></h5>
				<div>
					<div><label className="innerDynamicLabel pl-2">Button *</label></div>
					<div className="col s12">
						<div className="col s4 p-0 mt-3">
							<input type="checkbox" id="deleted" checked={this.state.deleted} className='filled-in' name="deleted" onChange={this.handleChange} />
							<label className="innerDynamicLabel" htmlFor="deleted" style={{paddingLeft:"35px"}}>Delete</label>
						</div>
						{this.state.deleted === true ?
							<div className="col s6 p-0">
								<Input
									s={12}
									label="Delete button text"
									id="deleteText"
									name="deleteText"
									type="text"
									value={this.state.deleteText}
									className="mb-1"
									onChange={this.handleChange}
									autoComplete='off'
									required
								/><div className="helper-text mb-1" >Default is Delete</div>
							</div>
							: null}
					</div>
					<div className="col s12">
						<div className="col s4 p-0 mt-3">
							<input type="checkbox" id="cancel" checked={this.state.cancel} className='filled-in' name="cancel" onChange={this.handleChange} />
							<label className="innerDynamicLabel" htmlFor="cancel" style={{paddingLeft:"35px"}}>Cancel</label>
						</div>
						{this.state.cancel === true ?
							<div className="col s6 p-0">
								<Input
									s={12}
									label="Cancel button text"
									//id="cancelText"
									name="cancelText"
									type="text"
									value={this.state.cancelText}
									className="mb-1"
									onChange={this.handleChange}
									autoComplete='off'
									required
								/><div className="helper-text mb-1" >Default is Cancel</div>
							</div>
							: null}
					</div>
					<div className="col s12">
						<div className="col s4 p-0 mt-3">
							<input type="checkbox" id="submit" checked={this.state.submit} className='filled-in' name="submit" onChange={this.handleChange} />
							<label className="innerDynamicLabel" htmlFor="submit" style={{paddingLeft:"35px"}}>Submit</label>
						</div>
						{this.state.submit === true ?
							<div className="col s6 p-0">
								<Input
									s={12}
									label="Submit button text"
									//id="submitText"
									name="submitText"
									type="text"
									value={this.state.submitText}
									className="mb-1"
									onChange={this.handleChange}
									autoComplete='off'
									required
								/><div className="helper-text mb-1" >Default is Submit</div>
							</div>
							: null}
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
export default ActionControl;