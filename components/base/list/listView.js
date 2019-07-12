import React, { Fragment } from 'react';
import { Col, Card, Preloader, Row, Badge, Button } from 'react-materialize';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            popup: false
        }
    }
    _handleCardClick = (e) => {
        // this.props.actions.routeTo("/viewedit");

        this.props.history.push({
            pathname: '/viewedit',
            state: {
                id: e.currentTarget.id,
                applicationMode: this.props.projectStatus == "save" ? "CREATE" : "VIEW"
            }
        })
    };
    _handlePop = () => {
        this.setState({
            popup: !this.state.popup
        })

    };
    _handleClone = (e) => {
        let ProjectId = e.target.parentElement.id;
        this.props.loaderHandler(true);
        this.props.actions.fetchSingleTenant(e.target.parentElement.id).then(response => {
            let id = this.props.actions.cloneProject(ProjectId);
            this.props.history.push({
                pathname: '/createProject',
                state: {
                    id: id,
                    applicationMode: "CREATE"
                }
            });

            this.props.loaderHandler(false);
        });
    };
    _handleExport = (e) => {
        this.props.loaderHandler(true);
        this.props.actions.exportProject(e.target.parentElement.id).then(response => {
            this.props.loaderHandler(response)
        });


    };

    render() {
        let testing = new Map(Object.entries(this.props.projectList));
        return (
            <tr>
                <td className="pl-4 pointer"style={{ textAlign: 'left'}}>
                    <p id={this.props.tenantId} onClick={this._handleCardClick} >{testing.get(this.props.tenantId).name}</p>
                </td>
                {this.props.projectList ?
                    <Fragment>
                        <td>{Object.keys(testing.get(this.props.tenantId).orgs).length}</td>
                        <td>{(testing.get(this.props.tenantId).orgsList.filter(item => item.level > 0)).length}</td>
                    </Fragment>
                    : null}
                {this.props.projectStatus != "save" && <td id={this.props.tenantId}>
                    <Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this._handleClone}>Clone</Button>&nbsp;
                    <Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this._handleExport}>Export</Button>
                </td>}
            </tr>

        )
    }
}
export default withRouter(ListView);