import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FunctionsTab from '../functionsTab';
import StudyConfigTab from '../studyConfigTab';
import EnrollmentTab from '../enrollmentTab';
import RolesTab from '../rolesTab';
import PagesTab from '../pagesTab';

let roles;
class TabsProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studyConfigsEmpty: true,
            enrollmentTargetsEmpty: true,
            pagesEmpty: true,
            rolesEmpty: true,
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ studyConfigsEmpty: this.studyConfigsEmptyCheck(newProps.selectedLocation.raConfig) })
        this.setState({ enrollmentTargetsEmpty: this.enrollmentTargetsEmptyCheck(newProps.selectedLocation.enrollmentTargets) })
        this.setState({ rolesEmpty: this.rolesEmptyCheck(newProps.selectedLocation.roles) })
        if(newProps.selectedLocation.roles !== undefined){
            null
        }else{
            this.setState({ rolesEmpty: this.rolesEmptyCheck(newProps.selectedOrganisation.roles) })
        }
        this.setState({ pagesEmpty: this.pagesEmptyCheck(newProps.selectedLocation.pages) })
    }

    componentDidMount() {
        this.setState({ studyConfigsEmpty: this.studyConfigsEmptyCheck(this.props.selectedLocation.raConfig) })
        this.setState({ enrollmentTargetsEmpty: this.enrollmentTargetsEmptyCheck(this.props.selectedLocation.enrollmentTargets) })
        this.setState({ rolesEmpty: this.rolesEmptyCheck(this.props.selectedLocation.roles) })
        if(this.props.selectedLocation.roles !== undefined){
            null
        }else{
            this.setState({ rolesEmpty: this.rolesEmptyCheck(this.props.selectedOrganisation.roles) })
        }
        this.setState({ pagesEmpty: this.pagesEmptyCheck(this.props.selectedLocation.pages) })
    }

    studyConfigsEmptyCheck = (raConfig) => {
        if (raConfig !== undefined) {
            if (raConfig.length !== 0 && raConfig[0].statusFlag !== "ignore") {
                return false
            } else {
                return true
            }
        } else {
            return true;
        }
    }

    rolesEmptyCheck = (roles) => {
        if (roles !== undefined) {
            if (roles.length > 0) {
                let checkStatus = [];
                roles.map(item => {
                    if (item.statusFlag !== "ignore") {
                        checkStatus.push(false)
                    } else {
                        checkStatus.push(true)
                    }
                })
                if (checkStatus.includes(false)) {
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        } else {
            return true
        }
    }

    pagesEmptyCheck = (pages) => {
        if (pages !== undefined) {
            if (pages.length > 0) {
                let checkStatus = [];
                pages.map(item => {
                    if (item.statusFlag !== "ignore") {
                        checkStatus.push(false)
                    } else {
                        checkStatus.push(true)
                    }
                })
                if (checkStatus.includes(false)) {
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        } else {
            return true
        }
    }

    enrollmentTargetsEmptyCheck = (enrollmentTargets) => {
        if (enrollmentTargets !== undefined) {
            if (enrollmentTargets.length > 0) {
                let checkStatus = []
                enrollmentTargets.map(item => {
                    if (item.statusFlag !== "ignore") {
                        checkStatus.push(false)
                    } else {
                        checkStatus.push(true)
                    }
                })
                if (checkStatus.includes(false)) {
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        } else {
            return true
        }
    }

    render() {
        return (
            <Row className='m-0'>
                <Tabs>
                    <TabList className="tabs customTabs z-depth-1 tabs-fixed-width">
                        {/* <Tab className="tab" >Functions</Tab> */}
                        <Tab className="tab" >Random Assignment {this.props.applicationMode == "CREATE" && this.state.studyConfigsEmpty ? <span style={{fontSize:"12px"}}>(Empty)</span> : null}</Tab>
                        <Tab className="tab" >Enrollment Target {this.props.applicationMode == "CREATE" && this.state.enrollmentTargetsEmpty ? <span style={{fontSize:"12px"}}>(Empty)</span> : null}</Tab>
                        <Tab className="tab" >Pages {this.props.applicationMode == "CREATE" && this.state.pagesEmpty ? <span style={{fontSize:"12px"}}>(Empty)</span> : null}</Tab>
                        <Tab className="tab" > * Roles {this.props.applicationMode == "CREATE" && this.state.rolesEmpty ? <span style={{fontSize:"12px"}}>(Empty)</span> : null}</Tab>
                    </TabList>
                    {/* <TabPanel>
                            <FunctionsTab/>
                        </TabPanel> */}

                    <TabPanel>
                        <StudyConfigTab
                            selectedLocation={this.props.selectedLocation}
                            StudyConfig={this.props.selectedLocation.raConfig}
                            applicationMode={this.props.applicationMode}
                            upadateNew={this.props.upadateNew}
                            SaveStudyConfig={this.props.SaveStudyConfig} />
                    </TabPanel>

                    <TabPanel>
                        <EnrollmentTab applicationMode={this.props.applicationMode} selectedOrganisation={this.props.selectedOrganisation} selectedLocation={this.props.selectedLocation} enrollmentTargets={this.props.selectedLocation.enrollmentTargets} SaveEnrollment={this.props.SaveEnrollment} />
                    </TabPanel>

                    <TabPanel>
                        <PagesTab bounds={this.props.selectedLocation.bounds} pages={this.props.selectedLocation.pages} tenantId={this.props.selectedLocation.tenantId} applicationMode={this.props.applicationMode} selectedLocation={this.props.selectedLocation} SavePages={this.props.SavePages} />
                    </TabPanel>

                    <TabPanel>
                        <RolesTab SaveFunctions={this.props.SaveFunctions} orgRoles={this.props.selectedOrganisation} roles={this.props.selectedLocation.roles} applicationMode={this.props.applicationMode} selectedLocation={this.props.selectedLocation} SaveRoles={this.props.SaveRoles} />
                    </TabPanel>
                </Tabs>
            </Row>
        )
    }
}
export default TabsProject;
