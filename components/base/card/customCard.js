import React, { Fragment } from 'react';
import { Col, Card, Preloader, Row, Badge } from 'react-materialize';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import './customCard.scss';
class CustomCard extends React.Component {
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
            <Col s={12} m={3} l={3} xl={3} className="tenant-class">
                <div className={this.props.projectStatus == "save"? "hide" :"hamburger" } onMouseOver={this._handlePop} onMouseOut={this._handlePop}   >
                    <div className={this.state.popup ? "cardMenu" : "cardMenu hide"} >
                        <ul className="collection" id={this.props.tenantId}>
                            <li onClick={this._handleClone} >Clone</li>
                            <li onClick={this._handleExport} >Export</li> </ul>  </div>
                </div>
                <Card className='white' title={testing.get(this.props.tenantId).name} id={this.props.tenantId} onClick={this._handleCardClick} >
                    {this.props.projectList ?
                        <Fragment>
                            <p>Organization: <span>{Object.keys(testing.get(this.props.tenantId).orgs).length}</span></p>
                            <p>Location: <span>  {(testing.get(this.props.tenantId).orgsList.filter(item => item.level > 0)).length} </span></p>

                        </Fragment> : null
                    }
                </Card>
            </Col>

        )
    }
}
export default withRouter(CustomCard);