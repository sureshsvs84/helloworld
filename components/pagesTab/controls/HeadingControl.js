import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';



class HeadingControl extends Component {

	constructor(props) {
		super(props);

		this.state = {
			label: '',
			level: "1"
		};


		this.handleChange = this.handleChange.bind(this);

	}

	componentDidMount() {
		this.setState({
			mode:this.props.mode,
			type:this.props.type,
			data:this.props.data,
			
		});
		if (Object.keys(this.props.data).length > 0){
			this.setState({
					
					label : this.props.data.label,
					level : this.props.data.options.level
			})	
		}

	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			mode:nextProps.mode,
			type:nextProps.type,
			data:nextProps.data,
		});

	}



	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value })
	}

	handleSubmit= () =>{
		const { onChange } = this.props;
		if(this.state.label !== undefined)
		{
			var label = this.state.label
		}
		if(this.state.level !== undefined)
		{
			var level = parseInt(this.state.level)
		}
		var initialState =  {  
			type:"heading",
			label, 
			options: {
				level
			}
		};
		onChange(initialState,this.props.index);
		this.props.close();
	}


	render() {


		return (
			<Fragment>
				<div>
						<h5><b>Heading Configuration</b></h5>
					</div>
					<div>
						<Input
							s={12}
							label="Element type"
							id="type"
							name="type"
							type="text"
							value="heading"
							disabled
							required
						/>
					</div>
					<div>
						<Input
							s={12}
							label="Label *"
							id="label"
							name="label"
							type="text"
							className= "labelText mb-1"
							value={this.state.label}
							required
							onChange={this.handleChange}
							autoComplete='off'
						/><div className="helper-text" >What the user sees</div>
					</div>
					<div>
					<h5><b>Options</b></h5>
						<div style={{height:"80px"}}>
						<label className="innerDynamicLabel" htmlFor="required">Level *</label>
							<Input
								s={12}
								//label="Level"
								id="Level"
								name="level"
								type="range"
								min= "1"
								max= "6"
								step= "1"
								value={this.state.level}
							onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="right valign-wrapper mt-2">
						<Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2"  onClick={this.handleSubmit}>Submit</Button>
						<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close} >Cancel</Button>
										
					</div>
			</Fragment>
		);

	}


}
export default HeadingControl;