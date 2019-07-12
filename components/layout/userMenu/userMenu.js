/* eslint-disable linebreak-style */
import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';

class UserMenu extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { isprofileDropDown, toggleProfile, toggleProfileDropDown } = this.props;
		return (
			<Fragment>
				<ul id="profile-dropdown" className={isprofileDropDown ? "dropdown-content showDropDown" : "dropdown-content"}>
					<li>
						<a href="#" className="grey-text text-darken-1">
							<i className="material-icons">face</i> Profile</a>
					</li>
					<li>
						<Link to="/signout" className="grey-text text-darken-1" onClick={toggleProfileDropDown} >
							<i className="material-icons">keyboard_tab</i> Logout
						</Link>
					</li>
				</ul>
			</Fragment>
		);
	}
}


export default (UserMenu);