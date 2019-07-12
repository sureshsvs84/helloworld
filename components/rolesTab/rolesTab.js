import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';
import { TEST_MESSAGE } from '../../actions/types';
import uuid from 'uuid';
import CopyRoleModel from '../base/copyRoleModal';
import objectUtil from '../../utils/objectUtil';

class RolesTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            selectedLocation: '',
            selectedOrganisation: '',
            orgRoles: [],
            selectedDropdownRole: '',
            applicationMode: '',
            selectedRole: {},
            selectedMenu: [],
            selectedResource: [],
            roleStatus: false,
            isEditMode: false,
            menuList: [],
            resourceList: [],
            RoleNameAlreadyExist: '',
            newRole: 1,
            DeleteModal: false,
            copyRoleModel: false,
            roleDefaultValue: '',
            disabledSelectRole: false,
            noRoleDisplay: true,
            SaveSuccessfullModal: false,
            functions: {}
            // functions: {
            //     intake: true,
            //     caseManagement: true,
            //     serviceTracking: true,
            //     caseAssignmentView: true,
            //     caseAssignmentEdit: true,
            //     userManagement: true
            // }
        };
        this.rolesData = {};
        this.menuData = {};
        this.resourceData = {};
        this.functions = [
            { name: "intake", path: "Intake", itemEnabledMenu: [2], itemEnabledResource: [14, 15, 5, 9] },
            { name: "caseManagement", path: "Case management", itemEnabledMenu: [3], itemEnabledResource: [1] },
            { name: "serviceTracking", path: "Service tracking", itemEnabledResource: [7, 6] },
            { name: "caseAssignmentView", path: "Case assignment - View", itemEnabledMenu: [4], itemEnabledResource: [3, 4] },
            { name: "caseAssignmentEdit", path: "Case assignment - Edit", itemEnabledResource: [8] },
            { name: "userManagement", path: "User management", itemEnabledMenu: [5] }
        ]
    }
    showAddRoles = () => {
        this.setState({
            selectedRole: {},
            selectedMenu: [],
            selectedResource: [],
            roleName: '',
            roleDescription: '',
            roleStatus: true,
            isEditMode: false,
            roleDefaultValue: true,
            disabledSelectRole: false,
            noRoleDisplay: false
        });
        this.rolesData = {};
        this.menuData = {};
        this.resourceData = {};
        this.selectAllMenu = false;
        this.selectAllResource = false;
    };
    confirmationModal = () => {
        this.setState({
            DeleteModal: true
        })
    };
    CancelconfirmationModal = () => {
        this.setState({
            DeleteModal: false,
            SaveSuccessfullModal: false,
            copyRoleModel: false
        })
    };
    roleBodyCreate = (description, id, isAssignable, isAutoAccess, isAutoAssignOnIntake, name) => {
        let roleBody = {};
        roleBody.description = description;
        roleBody.id = id;
        roleBody.isAssignable = isAssignable;
        roleBody.isAutoAccess = isAutoAccess;
        roleBody.isAutoAssignOnIntake = isAutoAssignOnIntake;
        roleBody.name = name;
        return roleBody;
    };//this is required because ds of the received role is different than ds of created role
    handleRoleDropdown = (e) => {
        this.selectAllMenu = false;
        this.selectAllResource = false;
        this.setState({
            selectedDropdownRole: e.target.value,
            roleStatus: true,
            isEditMode: true,
            RoleNameAlreadyExist: false,
            roleDefaultValue: false,
            disabledSelectRole: true
        });
        const selectedValue = e.target.value;
        if (this.props.selectedLocation.id != "") {
            let filteredRoles = this.props.roles.filter((role) => role.id == selectedValue);
            let filteredRolesData = filteredRoles[0];
            let newFilteredRolesData = filteredRoles[0];
            newFilteredRolesData.isAssignable = filteredRoles[0].isAssignable.data[0];
            newFilteredRolesData.isAutoAccess = filteredRoles[0].isAutoAccess.data[0];
            newFilteredRolesData.isAutoAssignOnIntake = filteredRoles[0].isAutoAssignOnIntake.data[0];

            this.setState({ selectedRole: newFilteredRolesData });// in view the ds of roles is different please take care

            let filteredMenu = [];
            this.props.roles.map((item) => {
                if (item.id == selectedValue) {
                    item.menus.map((data) => {
                        if (data.statusFlag == undefined || data.statusFlag == "new") {
                            filteredMenu = [...filteredMenu, data.menuId]
                        }
                    })
                }
            });

            this.setState(prevState => ({
                selectedMenu: [prevState.selectedMenu, ...filteredMenu]
            }));

            let filteredResource = [];
            this.props.roles.map((item) => {
                if (item.id == selectedValue) {
                    item.resources.map((data) => {
                        if (data.statusFlag == undefined || data.statusFlag == "new") {
                            filteredResource = [...filteredResource, data.resourceId]
                        }
                    })
                }
            }
            );
            this.setState(prevState => ({
                selectedResource: [prevState.selectedResource, ...filteredResource]
            }));
        } else {
            let filteredRoles = this.props.orgRoles.roles.filter((role) => role.id == selectedValue);
            let filteredRolesData = filteredRoles[0];

            this.setState({ selectedRole: filteredRolesData });// in view the ds of roles is different please take

            let filteredMenu = [];
            this.props.orgRoles.roles.map((item) => {
                if (item.id == selectedValue) {
                    item.menus.map((data) => {
                        if (data.statusFlag == undefined || data.statusFlag == "new") {
                            filteredMenu = [...filteredMenu, data.menuId]
                        }
                    })
                }
            });

            this.setState(prevState => ({
                selectedMenu: [prevState.selectedMenu, ...filteredMenu]
            }));

            let filteredResource = [];
            this.props.orgRoles.roles.map((item) => {
                if (item.id == selectedValue) {
                    item.resources.map((data) => {
                        if (data.statusFlag == undefined || data.statusFlag == "new") {
                            filteredResource = [...filteredResource, data.resourceId]
                        }
                    })
                }
            }
            );
            this.setState(prevState => ({
                selectedResource: [prevState.selectedResource, ...filteredResource]
            }));
        }
    };
    handleRoleInput = (e) => {
        //this.changedRoles = false;
        if (e.target.type === "checkbox" && e.target.getAttribute("roleType") === "Attribute") {
            this.rolesData[e.target.name] = e.target.checked ? 1 : 0;
            this.setState({ selectedRole: { ...this.state.selectedRole, ...this.rolesData } });
        } else if (e.target.type === "checkbox" && e.target.getAttribute("roleType") === "Resource") {
            this.resourceData[e.target.value] = e.target.checked ? 1 : 0;
            let selectedResource = [];
            selectedResource = this.state.selectedResource;
            Object.keys(this.resourceData).map(item => {
                if (this.resourceData[item] == 1) {
                    let duplicate = selectedResource.map(data => {
                        if (parseInt(data) == parseInt(item))
                            return true;
                    });
                    if (!duplicate.includes(true))
                        selectedResource.push(parseInt(item));
                }
                else {
                    let index = selectedResource.indexOf(parseInt(e.target.value));
                    if (index != -1)
                        selectedResource.splice(index, 1);
                }
            });
            this.setState({ selectedResource });
        }
        else if (e.target.type === "checkbox" && e.target.getAttribute("roleType") === "Menu") {
            this.menuData[e.target.value] = e.target.checked ? 1 : 0;
            let selectedMenu = [];
            selectedMenu = this.state.selectedMenu;
            Object.keys(this.menuData).map(item => {
                if (this.menuData[item] == 1) {
                    let duplicate = selectedMenu.map(data => {
                        if (parseInt(data) == parseInt(item))
                            return true;
                    });
                    if (!duplicate.includes(true))
                        selectedMenu.push(parseInt(item));
                }
                else {
                    let index = selectedMenu.indexOf(parseInt(e.target.value));
                    if (index != -1)
                        selectedMenu.splice(index, 1);
                }
            });
            this.setState({ selectedMenu });
        }
        else {
            this.rolesData[e.target.name] = e.target.value;
        }
    };
    handleSelectAllMenu = (e) => {
        let selectedMenu = [];
        let menuData = {};
        this.state.menuList.map(item => {
            this.menuMappedToFunction.map(id => {
                if (item.id == id) {
                    selectedMenu.push(item.id);
                    menuData[item.id] = 1;
                }
            })
        });
        if (e.target.checked == true) {
            this.selectAllMenu = true;
            this.setState({ selectedMenu });
            this.menuData = menuData;
        }
        else {
            this.selectAllMenu = false;
            this.setState({ selectedMenu: [] });
            this.menuData = {};
        }
    };
    handleSelectAllResource = (e) => {
        let selectedResource = [];
        let resourceData = {};
        this.state.resourceList.map(item => {
            this.resourceMappedToFunction.map(id => {
                if (item.id == id) {
                    selectedResource.push(item.id);
                    resourceData[item.id] = 1;
                }
            })
        });
        if (e.target.checked == true) {
            this.selectAllResource = true;
            this.setState({ selectedResource });
            this.resourceData = resourceData;
        }
        else {
            this.selectAllResource = false;
            this.setState({ selectedResource: [] });
            this.resourceData = {};
        }
    };
    successfullModel = () => {
        this.setState({
            SaveSuccessfullModal: true
        })
    };
    //Roles
    AddRole = (e) => {
        e.preventDefault();
        let newRole = {};
        const isDuplicatte = (this.props.selectedLocation.id ? this.props.roles : this.props.orgRoles.roles).map((iteratedValue) => {
            if (this.rolesData.roleName) {
                if (iteratedValue.name == this.rolesData.roleName) {
                    //this.rolesData = {}
                    return true;
                }
                else if (iteratedValue.name === this.state.selectedRole.name) {
                    return true;
                }
            }
            else if (iteratedValue.name === this.state.selectedRole.name) {
                return true;
            }
        });
        if (isDuplicatte.includes(true)) {
            this.setState({
                RoleNameAlreadyExist: true
            });
            return false;
        } else {
            this.setState({
                RoleNameAlreadyExist: false
            });

            //this.rolesData.roleId = this.state.newRole;
            const role = {
                "id": uuid.v4(),
                "name": this.rolesData.roleName ? this.rolesData.roleName : this.state.selectedRole.name ? this.state.selectedRole.name : '',
                "description": this.rolesData.roleDescription ? this.rolesData.roleDescription : this.state.selectedRole.description ? this.state.selectedRole.description : '',
                "orgId": this.props.selectedLocation.id ? this.props.selectedLocation.id : this.props.orgRoles.id,
                "isAssignable": this.rolesData.isAssignable ? this.rolesData.isAssignable : this.state.selectedRole.isAssignable && !this.rolesData.hasOwnProperty("isAssignable") ? this.state.selectedRole.isAssignable : this.state.selectedRole.isAssignable && this.rolesData.hasOwnProperty("isAssignable") ? this.rolesData.isAssignable : 0,
                "isAutoAccess": this.rolesData.isAutoAccess ? this.rolesData.isAutoAccess : this.state.selectedRole.isAutoAccess && !this.rolesData.hasOwnProperty("isAutoAccess") ? this.state.selectedRole.isAutoAccess : this.state.selectedRole.isAutoAccess && this.rolesData.hasOwnProperty("isAutoAccess") ? this.rolesData.isAutoAccess : 0,
                "isAutoAssignOnIntake": this.rolesData.isAutoAssignOnIntake ? this.rolesData.isAutoAssignOnIntake : this.state.selectedRole.isAutoAssignOnIntake && !this.rolesData.hasOwnProperty("isAutoAssignOnIntake") ? this.state.selectedRole.isAutoAssignOnIntake : this.state.selectedRole.isAutoAssignOnIntake && this.rolesData.hasOwnProperty("isAutoAssignOnIntake") ? this.rolesData.isAutoAssignOnIntake : 0,
                menus: [],
                resources: [],
                "statusFlag": "new",
            };
            if (this.state.selectedMenu == "") {
                Object.keys(this.menuData).map(r => {
                    if (this.menuData[r] == 1) {
                        let finalMenu = {};
                        finalMenu.menuId = parseInt(r);
                        finalMenu.roleId = role.id;
                        finalMenu.statusFlag = "new";
                        role.menus.push(finalMenu);
                    }
                })
            }
            else {
                this.state.selectedMenu.map(item => {
                    let finalMenu = {};
                    finalMenu.menuId = item;
                    finalMenu.roleId = role.id;
                    finalMenu.statusFlag = "new";
                    role.menus.push(finalMenu);
                })

            }
            if (this.state.selectedResource == "") {
                Object.keys(this.resourceData).map(r => {
                    if (this.resourceData[r] == 1) {
                        let finalResource = {};
                        finalResource.resourceId = parseInt(r);
                        finalResource.roleId = role.id;
                        finalResource.statusFlag = "new";
                        role.resources.push(finalResource);
                    }
                })
            }
            else {
                this.state.selectedResource.map(item => {
                    let finalResource = {};
                    finalResource.resourceId = item;
                    finalResource.roleId = role.id;
                    finalResource.statusFlag = "new";
                    role.resources.push(finalResource);

                })
            }
            this.props.SaveRoles(role);
            this.props.SaveFunctions(this.state.functions);
            this.props.actions.SaveRoles(this.props.orgRoles.tenantId, role);
            this.props.actions.SaveFunctions(this.props.orgRoles.tenantId, this.props.orgRoles.id, this.state.functions);

            this.rolesData = {};
            this.menuData = {};
            this.resourceData = {};
            this.setState({ selectedMenu: [], selectedResource: [] });
        }
        this.setState({
            selectedRole: '',
            roleName: '',
            roleDescription: '',
            roleDefaultValue: true,
            disabledSelectRole: false,
            roleStatus: false
        });
        //window.Materialize.toast("Save successful", 2000);
        this.successfullModel();
    };
    UpdateRole = () => {
        const isDuplicatte = (this.props.selectedLocation.id ? this.props.roles : this.props.orgRoles.roles).map((iteratedValue) => {
            if (this.rolesData.roleName) {
                if (iteratedValue.name == this.rolesData.roleName && iteratedValue.id != this.state.selectedDropdownRole) {
                    //this.rolesData = {}
                    return true;
                }
            }
        });
        if (isDuplicatte.includes(true)) {
            this.setState({
                RoleNameAlreadyExist: true,
            });
            return false;
        }
        else {
            this.setState({
                RoleNameAlreadyExist: false
            });
            let filteredMenu = [];
            let filteredMenuId = [];
            let menuFlag = [];
            if (this.props.selectedLocation.id) {
                this.props.roles.map((item) => {
                    if (item.id == this.state.selectedDropdownRole) {
                        menuFlag = item.menus;
                        item.menus.map((data) => {
                            filteredMenu = [...filteredMenu, data.menuId];
                            filteredMenuId = [...filteredMenuId, data.id]
                        })
                    }
                });
            } else {
                this.props.orgRoles.roles.map((item) => {
                    if (item.id == this.state.selectedDropdownRole) {
                        menuFlag = item.menus;
                        item.menus.map((data) => {
                            filteredMenu = [...filteredMenu, data.menuId];
                            filteredMenuId = [...filteredMenuId, data.id]
                        })
                    }
                });
            }

            let filteredResource = [];//[1, 2, 3, 5, 7], [{resourceId: 1, id: 20}]
            let filteredResourceId = [];
            let resourceFlag = [];
            if (this.props.selectedLocation.id) {
                this.props.roles.map((item) => {
                    if (item.id == this.state.selectedDropdownRole) {
                        resourceFlag = item.resources;
                        item.resources.map((data) => {
                            filteredResource = [...filteredResource, data.resourceId];
                            filteredResourceId = [...filteredResourceId, data.id]
                        })
                    }
                }
                );
            } else {
                this.props.orgRoles.roles.map((item) => {
                    if (item.id == this.state.selectedDropdownRole) {
                        resourceFlag = item.resources;
                        item.resources.map((data) => {
                            filteredResource = [...filteredResource, data.resourceId];
                            filteredResourceId = [...filteredResourceId, data.id]
                        })
                    }
                }
                );
            }
            let role = {};
            const updatedRoles = (this.props.selectedLocation.id ? this.props.roles : this.props.orgRoles.roles).map((iteratedValue) => {
                if (iteratedValue.id == this.state.selectedRole.id) {
                    role = {
                        "id": this.state.selectedRole.id,
                        "name": this.rolesData.roleName ? this.rolesData.roleName : iteratedValue.name,
                        "description": this.rolesData.roleDescription ? this.rolesData.roleDescription : iteratedValue.description,
                        "orgId": iteratedValue.orgId,
                        "isAssignable": this.rolesData.isAssignable || this.rolesData.isAssignable == 0 ?
                            this.rolesData.isAssignable : iteratedValue.isAssignable,
                        "isAutoAccess": this.rolesData.isAutoAccess || this.rolesData.isAutoAccess == 0 ?
                            this.rolesData.isAutoAccess : iteratedValue.isAutoAccess,
                        "isAutoAssignOnIntake": this.rolesData.isAutoAssignOnIntake || this.rolesData.isAutoAssignOnIntake == 0 ?
                            this.rolesData.isAutoAssignOnIntake : iteratedValue.isAutoAssignOnIntake,
                        menus: [],
                        resources: [],
                        "statusFlag": (iteratedValue.statusFlag == "modified" || iteratedValue.statusFlag == undefined) ? "modified" : "new"
                    };
                    let finalMenu = {};//need to create an object that has only manipulated value i.e
                    Object.keys(this.menuData).map(r => {
                        if (filteredMenu.indexOf(parseInt(r)) >= 0 && this.menuData[r] == 0) {
                            let finalMenu = {};
                            finalMenu.id = filteredMenuId[filteredMenu.indexOf(parseInt(r))];
                            finalMenu.menuId = parseInt(r);
                            finalMenu.roleId = this.state.selectedRole.id;
                            finalMenu.statusFlag = "delete";
                            role.menus.push(finalMenu);
                        } else if (filteredMenu.indexOf(parseInt(r)) <= 0 && this.menuData[r] == 1) {
                            let finalMenu = {};
                            finalMenu.menuId = parseInt(r);
                            finalMenu.roleId = this.state.selectedRole.id;
                            finalMenu.statusFlag = "new";
                            role.menus.push(finalMenu);
                        }
                    });
                    this.menuData = {};
                    let menuTest = role.menus.map(item => item.menuId);
                    filteredMenu.map(item => {//item has previous values
                        if (menuTest.indexOf(parseInt(item)) < 0) {
                            let test = {};
                            test.menuId = item;
                            test.roleId = this.state.selectedRole.id;
                            menuFlag.map(menuFlagData => {
                                if (item == menuFlagData.menuId && menuFlagData.statusFlag != undefined) {
                                    test.statusFlag = menuFlagData.statusFlag;
                                }
                            });

                            role.menus.push(test);
                        }
                    });
                    let finalResource = {};//need to create an object that has only manipulated value i.e
                    Object.keys(this.resourceData).map(r => {
                        if (filteredResource.indexOf(parseInt(r)) >= 0 && this.resourceData[r] == 0) {
                            let finalResource = {};
                            finalResource.id = filteredResourceId[filteredResource.indexOf(parseInt(r))];
                            finalResource.resourceId = parseInt(r);
                            finalResource.roleId = this.state.selectedRole.id;
                            finalResource.statusFlag = "delete";
                            role.resources.push(finalResource);
                        } else if (filteredResource.indexOf(parseInt(r)) <= 0 && this.resourceData[r] == 1) {
                            let finalResource = {};
                            finalResource.resourceId = parseInt(r);
                            finalResource.roleId = this.state.selectedRole.id;
                            finalResource.statusFlag = "new";
                            role.resources.push(finalResource);
                        }
                    });
                    this.resourceData = {};

                    let resourceTest = role.resources.map(item => item.resourceId);
                    filteredResource.map(item => {//item has previous values
                        if (resourceTest.indexOf(parseInt(item)) < 0) {
                            let test = {};
                            test.resourceId = item;
                            test.roleId = this.state.selectedRole.id;
                            resourceFlag.map(resourceFlagData => {
                                if (item == resourceFlagData.resourceId && resourceFlagData.statusFlag != undefined) {
                                    test.statusFlag = resourceFlagData.statusFlag;
                                }
                            });
                            role.resources.push(test);
                        }
                    });
                    return iteratedValue = role;
                } else {
                    return iteratedValue;
                }
            });

            let viewMenu = [];
            role.menus.map((data) => {
                if (data.statusFlag == "new" || data.statusFlag == undefined) {
                    viewMenu = [...viewMenu, data.menuId]
                }
            });

            let viewResource = [];
            role.resources.map((data) => {
                if (data.statusFlag == "new" || data.statusFlag == undefined) {
                    viewResource = [...viewResource, data.resourceId]
                }
            });
            this.setState({
                selectedRole: role,
                selectedMenu: viewMenu,
                selectedResource: viewResource,
                roleDefaultValue: true,
                disabledSelectRole: false,
                roleStatus: false
            });

            this.props.SaveRoles(role);
            this.props.SaveFunctions(this.state.functions);
            this.props.actions.SaveRoles(this.props.orgRoles.tenantId, role);

            this.props.actions.SaveFunctions(this.props.orgRoles.tenantId, this.props.orgRoles.id, this.state.functions);
            //window.Materialize.toast("Save successful", 2000);
            this.successfullModel();
        }
    };
    CancelRole = () => {
        this.setState({
            roleStatus: false,
            selectedRole: [],
            selectedMenu: [],
            selectedResource: [],
            roleName: '',
            roleDescription: '',
            roleDefaultValue: true,
            disabledSelectRole: false,
            isEditMode: false,
        });
        this.rolesData = {};
        this.menuData = {};
        this.resourceData = {};
    };
    DeleteRole = () => {
        let restListRole = this.props.selectedLocation.id ? this.props.roles.filter((role) => role.id != this.state.selectedRole.id)
            : this.props.orgRoles.roles.filter((role) => role.id != this.state.selectedRole.id);

        let filteredRoles = this.props.selectedLocation.id ? this.props.roles.filter((role) => role.id == this.state.selectedRole.id)
            : this.props.orgRoles.roles.filter((role) => role.id == this.state.selectedRole.id);

        let filteredRolesData = filteredRoles[0];
        filteredRolesData.statusFlag = (filteredRolesData.statusFlag == "modified" || filteredRolesData.statusFlag == undefined) ? "delete" : "ignore";
        this.props.SaveRoles(filteredRolesData);
        this.props.SaveFunctions(this.state.functions);
        this.props.actions.SaveRoles(this.props.orgRoles.tenantId, filteredRolesData);
        this.props.actions.SaveFunctions(this.props.orgRoles.tenantId, this.props.orgRoles.id, this.state.functions);

        this.setState({
            roleStatus: false,
            selectedRole: [],
            selectedMenu: [],
            selectedResource: [],
            roleName: '',
            roleDescription: '',
            DeleteModal: false,
            roles: restListRole,
            orgRoles: restListRole,
            roleDefaultValue: true,
            disabledSelectRole: false,
            isEditMode: false
        });
        this.rolesData = {};
        this.menuData = {};
        this.resourceData = {};
    };
    componentDidMount() {
        this.props.actions.fetchMenuList().then(response => {
            this.setState({
                menuList: response
            })
        });
        this.props.actions.fetchResourceList().then(response => {
            this.setState({
                resourceList: response
            })
        });

        if (this.props.orgRoles.roles != undefined || this.props.roles != undefined) {
            if ((this.props.selectedLocation.id == "" && this.props.orgRoles.roles && this.props.orgRoles.roles.length > 0) ||
                (this.props.selectedLocation.id != "" && this.props.roles && this.props.roles.length > 0)) {
                let role = [];
                this.props.selectedLocation.id == "" ? this.props.orgRoles.roles : this.props.selectedLocation.roles.map((item, i) => {
                    item = {
                        ...item,
                        isAssignable: item.isAssignable.data !== undefined ? item.isAssignable.data[0] : item.isAssignable,
                        isAutoAccess: item.isAutoAccess.data !== undefined ? item.isAutoAccess.data[0] : item.isAutoAccess,
                        isAutoAssignOnIntake: item.isAutoAssignOnIntake.data !== undefined ? item.isAutoAssignOnIntake.data[0] : item.isAutoAssignOnIntake,
                    };
                    role = [...role, item]
                });
                this.setState({
                    roles: role,
                    selectedLocation: this.props.selectedLocation,
                    selectedOrganisation: this.props.orgRoles,
                    orgRoles: this.props.orgRoles.roles,
                })
            }
        }
        if (!objectUtil.isEmpty(this.props.orgRoles.functions)) {
            this.setState({ functions: this.props.orgRoles.functions.functionsList });
        }
        else {
            let functions = {
                intake: true,
                caseManagement: true,
                serviceTracking: true,
                caseAssignmentView: true,
                caseAssignmentEdit: true,
                userManagement: true
            };
            this.setState({ functions });
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            roleStatus: false, isEditMode: false
        });
        let role = [];
        if ((props.selectedLocation.id == "" && props.orgRoles.roles && props.orgRoles.roles.length > 0) ||
            (props.selectedLocation.id != "" && props.roles && props.roles.length > 0)) {
            props.selectedLocation.id == "" ? props.orgRoles.roles : props.selectedLocation.roles.map((item, i) => {
                item = {
                    ...item,
                    isAssignable: item.isAssignable.data !== undefined ? item.isAssignable.data[0] : item.isAssignable,
                    isAutoAccess: item.isAutoAccess.data !== undefined ? item.isAutoAccess.data[0] : item.isAutoAccess,
                    isAutoAssignOnIntake: item.isAutoAssignOnIntake.data !== undefined ? item.isAutoAssignOnIntake.data[0] : item.isAutoAssignOnIntake,
                };
                role = [...role, item]
            });
            if (props.orgRoles.roles != undefined || props.roles != undefined) {
                this.setState({
                    selectedLocation: props.selectedLocation,
                    selectedOrganisation: props.orgRoles,
                    orgRoles: props.orgRoles.roles,
                    roles: role,
                    applicationMode: props.applicationMode,
                    roleStatus: false,
                    roleDefaultValue: true,
                    disabledSelectRole: false
                })
            }
        }
        if (!objectUtil.isEmpty(props.orgRoles.functions)) {
            this.setState({ functions: props.orgRoles.functions.functionsList });
        }
        else {
            let functions = {
                intake: true,
                caseManagement: true,
                serviceTracking: true,
                caseAssignmentView: true,
                caseAssignmentEdit: true,
                userManagement: true
            };
            this.setState({ functions });
        }
    }
    componentWillUnmount() {
        //  alert("unmouting ")
    }
    _handleFunctions = (e) => {
        this.checkedFunctions = e.target.name;
        let functions = this.state.functions;
        functions[e.target.name] = !this.state.functions[e.target.name];
        this.setState({
            functions
        })
    };
    _copyRoleModel = () => {
        this.setState({
            copyRoleModel: true,
            selectedRole: {},
            selectedMenu: [],
            selectedResource: [],
            roleName: '',
            roleDescription: '',
            roleStatus: true,
            isEditMode: false,
            roleDefaultValue: true,
            disabledSelectRole: false,
            noRoleDisplay: false
        });
        this.rolesData = {};
        this.menuData = {};
        this.resourceData = {};
        this.selectAllMenu = false;
        this.selectAllResource = false;
    };
    copyRole = (data) => {
        let selectedRole = {
            ...data,
            id: uuid.v4(),
            name: data.name + '_Copy',
            isAssignable: data.isAssignable.data !== undefined ? data.isAssignable.data[0] : data.isAssignable,
            isAutoAccess: data.isAutoAccess.data !== undefined ? data.isAutoAccess.data[0] : data.isAutoAccess,
            isAutoAssignOnIntake: data.isAutoAssignOnIntake.data !== undefined ? data.isAutoAssignOnIntake.data[0] : data.isAutoAssignOnIntake,
            statusFlag: "new"

        };
        let selectedMenu = data.menus;
        let selectedResource = data.resources;
        let filteredMenu = [];

        data.menus.map((item) => {
            if (item.statusFlag == undefined || item.statusFlag == "new") {
                filteredMenu = [...filteredMenu, item.menuId]
            }
        });

        let filteredResource = [];

        data.resources.map((item) => {
            if (item.statusFlag == undefined || item.statusFlag == "new") {
                filteredResource = [...filteredResource, item.resourceId]
            }
        });

        this.setState({
            selectedRole,
            selectedMenu: filteredMenu,
            selectedResource: filteredResource,
            roleStatus: true
        })
    };
    render() {
        this.menuMappedToFunction = [1];
        this.resourceMappedToFunction = [10, 2];
        this.functions.map(data => {
            if (this.state.functions && this.state.functions[data.name] == true) {
                this.menuMappedToFunction = this.menuMappedToFunction.concat(data.itemEnabledMenu);
                this.resourceMappedToFunction = this.resourceMappedToFunction.concat(data.itemEnabledResource);
            }
        });
        return (
            <Row className='m-0'>
                <div>
                    <div className='col s12 m12 l12 xl12 mb-2'>
                        {(this.props.orgRoles.roles || this.props.roles) ?
                            <Fragment>
                                {(this.props.selectedLocation.id == "" && this.props.orgRoles.roles.length > 0) || (this.props.selectedLocation.id != "" && this.props.roles.length > 0) ?
                                    <select className="col s3 mt-1 ml-1 pl-0 Dropdown" name="selectedRole" onChange={this.handleRoleDropdown} key={this.state.roleDefaultValue}
                                        defaultValue={this.state.roleDefaultValue}>
                                        <option disabled={this.state.disabledSelectRole}>Select Role</option>
                                        {this.props.selectedLocation.id != "" ?
                                            this.props.roles.map((iteratedValue, i) => {
                                                if (iteratedValue.statusFlag == "new" || iteratedValue.statusFlag == "modified" || iteratedValue.statusFlag == undefined) {

                                                    return <option id={i} value={iteratedValue.id}>{iteratedValue.name}</option>
                                                } else if (iteratedValue.statusFlag == "delete" || iteratedValue.statusFlag == "ignore") {
                                                    return <option id={i} value={iteratedValue.id} className="hiddenDeletedRole" disabled>deleted Role</option>
                                                }
                                            }
                                            )
                                            : this.props.orgRoles.roles.map((iteratedValue, i) => {
                                                if (iteratedValue.statusFlag == "new" || iteratedValue.statusFlag == "modified" || iteratedValue.statusFlag == undefined) {
                                                    return <option id={i} value={iteratedValue.id}>{iteratedValue.name}</option>
                                                }
                                                else if (iteratedValue.statusFlag == "delete" || iteratedValue.statusFlag == "ignore") {
                                                    return <option id={i} value={iteratedValue.id} className="hiddenDeletedRole" disabled>deleted Role</option>
                                                }
                                            }
                                            )
                                        }
                                    </select >
                                    : <Fragment> {this.state.noRoleDisplay && <p className='col s3 mt-2 pl-2'>No role to display</p>}</Fragment>}
                            </Fragment>
                            : <Fragment> {this.state.noRoleDisplay && <p className='col s3 mt-2 pl-2'>No role to display </p>}</Fragment>}
                        {this.props.applicationMode == 'VIEW' ? null :
                            <div>
                                <div className='col s10 m3 mt-2 ml-0'>
                                    <Col className=' col s8'>
                                        <Button className='btn btn_primary otherButtonAddDetUpt iconButton' onClick={this.showAddRoles} >
                                            <i className="material-icons" title='Add Role'>
                                                add_circle
                                        </i><span>Add Role</span>
                                        </Button>
                                    </Col>
                                    <Col className='col s2'>
                                        {(this.state.isEditMode && this.props.applicationMode !== 'VIEW') && <Button className="orgIcon innerRolesButton"
                                            onClick={this.confirmationModal}>
                                            <i className="material-icons" title='Delete Role'>
                                                delete
                                        </i>
                                        </Button>}
                                    </Col>
                                </div>
                                <div className='col s8 m3 mt-2 ml-0 pl-0'>
                                    <Col className='col s8'>
                                        <Button className="btn btn_primary otherButtonAddDetUpt iconButton" onClick={this._copyRoleModel}>
                                            <i className="material-icons" title="Copy Role">file_copy</i>
                                            <span>Copy Role</span>
                                        </Button>
                                    </Col>
                                    <CopyRoleModel open={this.state.copyRoleModel} savedRoles={this.props.orgRoles.roles} CancelconfirmationModal={this.CancelconfirmationModal} copyRole={this.copyRole} />
                                </div>
                            </div>
                        }
                    </div>
                    {this.state.roleStatus &&
                        <div className=" RoledAddDiv row m-0 ml-1" >
                            <p className={this.state.RoleNameAlreadyExist ? "show errorMessage col s12 m12 l12 xl12 m-0 pl-1" : "hide"} >
                                This role name is already exist
                        </p>

                            <form onSubmit={this.AddRole}>
                                <div className='col s12 m12 l12 xl12 pl-0 '>
                                    <Input s={4} autoComplete="off" label="Name" name="roleName" onChange={this.handleRoleInput}
                                        key={this.state.selectedRole.name} defaultValue={this.state.selectedRole.name} required={true}
                                        readOnly={this.props.applicationMode == 'VIEW' ? true : false} />
                                    <div className='col s4 ml-1'>
                                        <Input s={12} autoComplete="off" label="Description" name="roleDescription" onChange={this.handleRoleInput} key={this.state.selectedRole.description}
                                            defaultValue={this.state.selectedRole.description} readOnly={this.props.applicationMode == 'VIEW' ? true : false} />
                                    </div>
                                </div>

                                <div className=" col s12 functions d-flex mb-1">
                                    <h5 className="mt-0"> Functions </h5>
                                    {
                                        this.functions.map(data => {
                                            return <Input type='checkbox' className='filled-in' name={data.name}
                                                checked={this.state.functions && this.state.functions[data.name]}
                                                label={data.path}
                                                onChange={this._handleFunctions} disabled={this.props.applicationMode == 'VIEW' ? true : false} />
                                        })
                                    }
                                </div>
                                <div className='mb-2 col s4 menu'>
                                    <h5>Menu Access</h5>
                                    <table className="role-details">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Input
                                                        type='checkbox'
                                                        roleType="Menu"
                                                        className={'filled-in'}
                                                        name="Select All"
                                                        onChange={this.handleSelectAllMenu}
                                                        label="Select All"
                                                        disabled={this.props.applicationMode == 'VIEW' ? true : false}
                                                        checked={this.selectAllMenu}
                                                    />
                                                </td>
                                            </tr>
                                            {this.state.menuList.map((iteratedValue, index) => {

                                                return <tr>
                                                    {(iteratedValue.name) !== "" ?
                                                        <td>

                                                            <Input
                                                                type='checkbox'
                                                                roleType="Menu"
                                                                className={'filled-in'}
                                                                name={iteratedValue.name}
                                                                onChange={this.handleRoleInput}
                                                                value={iteratedValue.id}
                                                                label={iteratedValue.label}
                                                                checked={this.state.selectedMenu.filter(item => item == iteratedValue.id).length > 0 ? true : false}
                                                                disabled={this.props.applicationMode == 'VIEW' ? true :
                                                                    (this.menuMappedToFunction.filter(item => (item == iteratedValue.id)).length > 0 ? false : true)}
                                                            />
                                                        </td> : null}
                                                </tr>
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mb-2 col s4 resource'>
                                    <h5>Resource Access</h5>
                                    <table className="role-details">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Input
                                                        type='checkbox'
                                                        roleType="Resource"
                                                        className={'filled-in'}
                                                        name="Select All"
                                                        onChange={this.handleSelectAllResource}
                                                        label="Select All"
                                                        disabled={this.props.applicationMode == 'VIEW' ? true : false}
                                                        checked={this.selectAllResource}
                                                    />
                                                </td>
                                            </tr>
                                            {this.state.resourceList.map(iteratedValue => {
                                                return <tr>
                                                    <td>
                                                        <Input
                                                            type='checkbox'
                                                            roleType="Resource"
                                                            className='filled-in'
                                                            onChange={this.handleRoleInput}
                                                            value={iteratedValue.id}
                                                            name={iteratedValue.name}
                                                            label={iteratedValue.name}
                                                            checked={this.state.selectedResource.filter(item => item == iteratedValue.id).length > 0 ? true : false}
                                                            disabled={this.props.applicationMode == 'VIEW' ? true :
                                                                (this.resourceMappedToFunction.filter(item => (item == iteratedValue.id)).length > 0 ? false : true)}
                                                        />
                                                    </td>
                                                </tr>
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mb-2 col s4'>
                                    <h5>Attributes</h5>
                                    <table className="role-details">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Input type='checkbox' className='filled-in' roleType="Attribute" name="isAssignable" onChange={this.handleRoleInput}
                                                        label='Assignable' checked={this.state.selectedRole.isAssignable == 1 ? true : false}
                                                        disabled={this.props.applicationMode == 'VIEW' ? true : false} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Input type='checkbox' className='filled-in' roleType="Attribute" name="isAutoAccess" onChange={this.handleRoleInput}
                                                        label='AutoAccess' checked={this.state.selectedRole.isAutoAccess == 1 ? true : false}
                                                        disabled={this.props.applicationMode == 'VIEW' ? true : false} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Input type='checkbox' className='filled-in' roleType="Attribute" name="isAutoAssignOnIntake" onChange={this.handleRoleInput}
                                                        label='AutoAssignIntake' checked={this.state.selectedRole.isAutoAssignOnIntake == 1 ? true : false}
                                                        disabled={this.props.applicationMode == 'VIEW' ? true : false} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {this.props.applicationMode == 'VIEW' ? null :
                                    <div className='mb-2 col s12'>
                                        {(!this.state.isEditMode && this.props.applicationMode !== 'VIEW') && <Button type="submit"
                                            className="btn_secondary otherButtonAddDetUpt" style={{ float: 'right' }}>Save</Button>}
                                        {(this.state.isEditMode && this.props.applicationMode !== 'VIEW') && <Button type='button'
                                            className="show btn_secondary otherButtonAddDetUpt" onClick={this.UpdateRole} style={{ float: 'right' }}>Save</Button>}
                                        {(this.props.applicationMode !== 'VIEW') && <Button type='button'
                                            className="show right btn_secondary otherButtonAddDetUpt ml-1 mr-2" onClick={this.CancelRole}>Cancel</Button>}
                                    </div>
                                }
                            </form>
                        </div>}
                </div>
                <Modal
                    header='RAPTER Configurator'
                    id='DeleteRoleModal'
                    modalOptions={{ dismissible: false }}
                    open={this.state.DeleteModal} >
                    <p>Are you sure you want to delete it?</p>

                    <div className="col s12 m12 l12 xl12">
                        <Button className="btn btn_secondary otherButtonAddDetUpt modalButton mb-2 ml-1" onClick={this.CancelconfirmationModal}>No</Button>
                        <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' onClick={this.DeleteRole} >Yes</Button>
                    </div>
                </Modal>
                <Modal
                    id='SaveSuccessfullModal'
                    modalOptions={{ dismissible: false }}
                    open={this.state.SaveSuccessfullModal} >
                    <p style={{ textAlign: 'center' }}>Saved Successfully</p>

                    <div className="col s12 m12 l12 xl12">
                        <Button className="btn btn_secondary otherButtonAddDetUpt modalButton mb-2 ml-1" onClick={this.CancelconfirmationModal}>OK</Button>
                    </div>
                </Modal>

            </Row>
        )
    }
}
export default RolesTab;
