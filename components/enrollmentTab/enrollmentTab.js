import React, { Component, Fragment } from 'react';
import { Row, Card, Modal, Button, Input } from 'react-materialize';
import ReactGrid from '../base/reactAgGrid';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { HeaderData } from '../enrollmentTab/headerData'
import objectUtil from '../../utils/objectUtil';
import uuid from 'uuid';
const localConstant = objectUtil.getlocalizeData();
class EnrollmentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {

            openModal: false,
            deleteModal: false,
            startDate: null,
            isModal: '',
            id: '',
            isMandatoryValidation: false,
            buttonDisable: true,
        };
        this.editedRowData = {};
        this.updatedData = {};
        this.previousId = 0;
        objectUtil.bindAction(HeaderData.enrollmentTargetHeaderCreate, "EditColumn", this._editRowHandler);
        objectUtil.bindAction(HeaderData.enrollmentTargetHeaderCreate, "DeleteColumn", this._deleteRowHandler);
    }
    componentDidMount() {
        // if (this.props.enrollmentTargets && this.props.enrollmentTargets.length > 0) {
        if (this.props.enrollmentTargets != undefined) {
            this.setState({
                enrollmentTargets: this.props.enrollmentTargets
            });
        }
    }
    componentWillReceiveProps(props) {
        // if (props.enrollmentTargets != undefined) {
        //     if (props.enrollmentTargets && props.enrollmentTargets.length > 0) {
        let enrollmentTargets = props.enrollmentTargets;
        this.setState({
            enrollmentTargets,
        })
        // }
        // }
    }
    _editRowHandler = (data) => {
        const d = new Date(data.month);
        d.setDate(d.getDate());
        this.setState({
            startDate: d
        });
        this.setState({ openModal: true, isModal: "", id: data.id, isMandatoryValidation: false });
        this.editedRowData = data;
    };
    _deleteRowHandler = () => {
        this.setState({ deleteModal: !this.state.deleteModal })
    };
    _isFirstday = (date) => {
        const day = date.getDate();
        return day === 1
    };
    _enrollmentDateHandler = (data) => {
        console.log(data)
        if (this.isValidDate(data) && data != null) {
            this.setState({ isMandatoryValidation: false, buttonDisable: false });
            this.month = data; // for showing in UI
            this.formatedMonth = data; //for sending in backend
            this.setState({
                startDate: new Date(this.month)
            });
            this.formatedMonth.setMinutes(30);
            this.formatedMonth.setHours(5);
            this.formatedMonth = this.formatedMonth.toISOString();

            let isDuplicate = this.state.enrollmentTargets.map((iteratedValue) => {
                if (iteratedValue.month === this.formatedMonth) {
                    return true
                }
            });
            if (isDuplicate.includes(true)) {
                window.Materialize.toast(localConstant.warningMessages.DUPLICATE_MONTH, 2000);
                this.setState({ startDate: null });
                this.updatedData.month = ""
            }
            else {
                this.updatedData["month"] = this.formatedMonth;
            }
            // this.props.enrollmentTargets.map(record => {
            //     debugger
            //     if (record.month == this.formatedMonth && record.id!= this.state.id ) {
            //         window.Materialize.toast(localConstant.warningMessages.DUPLICATE_MONTH, 2000);
            //         this.setState({ startDate: null })
            //         //return false;
            //     }
            //     else{
            //         this.updatedData["month"] = this.formatedMonth;
            //     }
            // })            

        }
        else {
            if (data != null) {
                window.Materialize.toast(localConstant.warningMessages.VALID_DATE, 2000);
                this.setState({ startDate: null })
            }
        }
    };
    _inputHandlerChange = (e) => {
        const value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
        this.updatedData[e.target.name] = value;
        if (this.updatedData.target != "") {
            this.setState({ buttonDisable: false });
        }
        this.setState({ isMandatoryValidation: false });
    };
    _cancelEnrollmentTarget = () => {
        this.setState({ openModal: false, id: '', buttonDisable: true, deleteModal: false });
        this.updatedData = {};
        this.editedRowData = {};
    };
    _showEnrollment = () => {
        this.setState({ startDate: null });
        this.editedRowData.target = "";
        this.setState({ openModal: true, isModal: "Add", isMandatoryValidation: false });
    };
    _addEnrollmentTarget = (e) => {
        e.preventDefault();
        this.previousId = uuid.v4();
        if (this.updatedData && !(objectUtil.isEmpty(this.updatedData))) {
            if (this.enrollmentValidation(this.updatedData)) {
                this.updatedData["month"] = this.formatedMonth;
                this.updatedData["id"] = this.previousId;
                this.updatedData["orgId"] = this.props.selectedLocation.id;
                this.updatedData["statusFlag"] = "new";
                this.setState({ enrollmentTargets: [...this.state.enrollmentTargets, this.updatedData], buttonDisable: true });
                this.props.actions.SaveEnrollment(this.props.selectedLocation.tenantId, this.updatedData);
                this.props.SaveEnrollment(this.updatedData);
                this._cancelEnrollmentTarget();
            }
        }
        else {
            this.setState({ isMandatoryValidation: true });
        }
    };
    _updateEnrollmentTarget = () => {
        if (this.editedRowData.hasOwnProperty("statusFlag") && this.editedRowData["statusFlag"] == "new") {
            this.updatedData["statusFlag"] = "new";
        }
        else {
            this.updatedData["statusFlag"] = "modified";
        }
        //this.updatedData["month"] = this.formatedMonth;
        this.updatedData["orgId"] = this.props.selectedLocation.id;
        const combinedData = { ...this.editedRowData, ...this.updatedData };

        //if (this.updatedData && !(objectUtil.isEmpty(this.updatedData))) {
        if (combinedData.month != "" && combinedData.target != "") {
            // this.state.enrollmentTargets.map(record => {
            //     //console.log(record.month)
            //     if (record.month == combinedData.month) {
            //         //window.Materialize.toast(localConstant.warningMessages.DUPLICATE_MONTH, 2000);
            //         //this.setState({ startDate: null })
            //     }
            //  else {
            this.props.actions.SaveEnrollment(this.props.selectedLocation.tenantId, combinedData);
            this.props.SaveEnrollment(combinedData);
            this.gridChildren.refreshCells(true);
            this._cancelEnrollmentTarget();
            this.setState({ startDate: null, buttonDisable: true });
            this.editedRowData.target = "";
            // }
            //})
        }
        else {
            this.setState({ isMandatoryValidation: true });
        }
        //}
    };
    _deleteEnrollmentTarget = () => {
        let selectedData = this.gridChildren.getSelectedRows();
        this.gridChildren.removeSelectedRows(selectedData);
        const rowsToDisplay = this.gridChildren.gridApi.clientSideRowModel.rowsToDisplay.map(row => row.data);
        this.setState({ enrollmentTargets: rowsToDisplay, deleteModal: false });
        selectedData.map(data => {
            selectedData = data
        });
        // selectedData.statusFlag = "delete";
        if (selectedData.statusFlag == "modified" || selectedData.statusFlag == undefined)
            selectedData.statusFlag = "delete";
        else selectedData.statusFlag = "ignore";
        this.props.actions.SaveEnrollment(this.props.selectedLocation.tenantId, selectedData);
        this.props.SaveEnrollment(selectedData)
    };
    isValidDate(date) {
        const datePattern = /(^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$)/;
        var date = new Date(date),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        const testDate = [date.getFullYear(), mnth, day].join("-");
        if (datePattern.test(testDate)) {
            return true;
        } else {
            return false;
        }
    }
    enrollmentValidation = (data) => {
        if (objectUtil.isEmpty(data.month) || objectUtil.isEmpty(data.target)) {
            //window.Materialize.toast(localConstant.warningMessages.MANDATORY_VALIDATION, 2000);
            this.setState({ isMandatoryValidation: true });
            return false;
        }
        if (data.target < 0) {
            window.Materialize.toast("Minimum target should be 0", 2000);
            return false;
        }
        return true;
    };
    render() {
        return (
            <Fragment>
                {this.state.enrollmentTargets ?
                    <div>
                        {(this.props.applicationMode == "VIEW" && this.state.enrollmentTargets.length == 0) ?
                            <p className="pl-2">{localConstant.commonConstants.NO_DATA}</p> :
                            <div>
                                <Modal
                                    header='RAPTER Configurator'
                                    id='DeleteEnrollmentModal'
                                    open={this.state.deleteModal}
                                    modalOptions={{ dismissible: false }}
                                >
                                    <p>{localConstant.warningMessages.DELETE_CONFIRMATION}</p>

                                    <div className="col s12 m12 l12 xl12">
                                        <Button className="btn btn_secondary otherButtonAddDetUpt modalButton mb-2 ml-1" onClick={this._cancelEnrollmentTarget}>{localConstant.commonConstants.NO}</Button>
                                        <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' onClick={this._deleteEnrollmentTarget} >{localConstant.commonConstants.YES}</Button>
                                    </div>
                                </Modal>
                                <Modal open={this.state.openModal}
                                    modalOptions={{ dismissible: false }}
                                    actions={
                                        <div>
                                            <Button onClick={this.state.isModal == "Add" ? this._addEnrollmentTarget : this._updateEnrollmentTarget} className="btn_secondary otherButtonAddDetUpt mr-2" disabled={this.state.buttonDisable} >{localConstant.commonConstants.OK}</Button>
                                            <Button onClick={this._cancelEnrollmentTarget} className="btn_secondary otherButtonAddDetUpt" >{localConstant.commonConstants.CANCEL}</Button>
                                        </div>
                                    }
                                    header={localConstant.Enrollment_Target.ENROLLMENT_TARGET} >
                                    <div className='row' >
                                        <div >
                                            <label className="col s3 pt-3 mr-1 pl-2" >Month<label className="danger-txt">*</label></label>
                                            <DatePicker
                                                 name="month"
                                                 autoComplete="off"
                                                 placeholderText="Click to select a month"
                                                // //dateFormat="yyyy-MM-dd"
                                                // dateFormat="MM/yyyy"
                                                // //filterDate={this._isFirstday}
                                                // //showYearDropdown
                                                // id="uniquenumber"
                                                // //showMonthDropdown
                                                // selected={this.state.startDate}
                                                // onChange={this._enrollmentDateHandler}
                                                onKeyDown={(evt) => ((evt.which >= 48 && evt.which <= 57)||(evt.which >= 65 && evt.which <= 90) 
                                                    || (evt.which >= 97 && evt.which <= 122) || evt.which != 8 || evt.key !== '-') && evt.preventDefault()}
                                                selected={this.state.startDate}
                                                onChange={this._enrollmentDateHandler}
                                                dateFormat="yyyy-MM"
                                                showYearDropdown
                                                showMonthYearPicker
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col s3 pt-5 pl-2">Target<label className="danger-txt">*</label></label>
                                        <div className="pl-0">
                                            <Input type='number' min="0" name="target"
                                                autoComplete="off"
                                                onChange={this._inputHandlerChange}
                                                defaultValue={this.editedRowData.target}
                                                key={this.editedRowData.target}
                                                placeholder="Enter a target"
                                                onKeyDown={(evt) => (evt.key === 'e' || evt.key === '+' || evt.key === '-' || evt.key === '.') && evt.preventDefault()}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        {this.state.isMandatoryValidation == true ?
                                            <p className="errorMessage right m-0 pl-3">{localConstant.warningMessages.MANDATORY_VALIDATION}</p>
                                            : null}
                                    </div>
                                </Modal>
                                {this.props.applicationMode !== 'VIEW' ?
                                    <div className="right pt-1 pr-2">
                                        <Button className="mt-5 btn_secondary otherButtonAddDetUpt" onClick={this._showEnrollment} >{localConstant.Enrollment_Target.ADD_ENROLLMENT}</Button>
                                    </div> : null}
                                <br /><br />
                                <ReactGrid
                                    enroll={"Enroll"}
                                    applicationMode={this.props.applicationMode}
                                    gridColData={this.props.applicationMode == "VIEW" ? HeaderData.enrollmentTargetHeaderView : HeaderData.enrollmentTargetHeaderCreate}
                                    gridRowData={this.state.enrollmentTargets && this.state.enrollmentTargets.filter(item => {
                                        if (item.hasOwnProperty("statusFlag")) {
                                            if (item.statusFlag == "new" || item.statusFlag == "modified") {
                                                return item
                                            }
                                        }
                                        else {
                                            return item
                                        }
                                    })}
                                    onRef={ref => { this.gridChildren = ref; }}
                                />
                            </div>}
                    </div>
                    : <p className="pl-2">{localConstant.commonConstants.SELECT_AN_LTO}</p>}

            </Fragment>
        )
    }
}
export default EnrollmentTab;