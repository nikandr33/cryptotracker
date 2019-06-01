import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Table
} from "reactstrap";

import ReactBSAlert from "react-bootstrap-sweetalert";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import CreatePortfolio from "./CreatePortfolio.jsx";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      horizontalTabs: "profile",
      verticalTabs: "profile",
      verticalTabsIcons: "home",
      pageTabs: "1",
      openedCollapses: ["collapseOne"],
      alert: null
    };
  }
  inputAlert = () => {
    this.setState({
      alert: (
        <ReactBSAlert
          input
          showCancel
          style={{ display: "block", marginTop: "-100px" }}
          title="Input portfolio name:"
          onConfirm={e => this.inputConfirmAlert(e)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          btnSize=""
        />
      )
    });
  };
  inputConfirmAlert = e => {
    this.setState({ portfolioName: e, alert: null });
    setTimeout(this.inputConfirmAlertNext, 200);
  };
  hideAlert = () => {
    this.setState({
      alert: null
    });
  };

  // with this function we change the active tab for all the tabs in this page
  changeActiveTab = (e, tabState, tadName) => {
    e.preventDefault();
    this.setState({
      [tabState]: tadName
    });
  };
  render() {
    //console.log(this.props.portfolios)
    const TabHeader = () => {
      return (
        this.props.portfolios && this.props.portfolios.map((prop, key) => {
          return (
            <NavItem key={key}>
              <NavLink
                data-toggle="tab"
                href="#pablo"
                className={
                  this.state.pageTabs === prop.id ? "active" : ""
                }
                onClick={e =>
                  this.changeActiveTab(e, "pageTabs", prop.id)
                }
              >
                { this.state.pageTabs === prop.id && <i className="tim-icons icon-bank" /> }
                {prop.name}
              </NavLink>
            </NavItem>
          )
        })
      )
    }

    const TabBody = () => {
      return (
        this.props.portfolios && this.props.portfolios.map((prop, key) => {
          return (
            <TabPane key={key} tabId={prop.id}>
              <div className="content">
                <Row>
                <Col md="12">
                  <Card>
                    <CardHeader>
                      <div className="tools float-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            caret
                            className="btn-link btn-icon"
                            color="default"
                            data-toggle="dropdown"
                            type="button"
                          >
                            <i className="tim-icons icon-settings-gear-63" />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Add coin
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                            <DropdownItem
                              className="text-danger"
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Remove Data
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <CardTitle tag="h4">{prop.name} {prop.content}</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Table responsive>
                        <thead className="text-primary">
                          <tr>
                            <th className="text-center">#</th>
                            <th className="text-center"></th>
                            <th>Coin</th>
                            <th>Price</th>
                            <th className="text-center">Totall Value</th>
                            <th className="text-right">Profit/Loss</th>
                            <th className="text-right">Date Buy</th>
                            <th className="text-right">Change</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th className="text-center"></th>
                            <th className="text-center"></th>
                            <th></th>
                            <th></th>
                            <th className="text-center">20000</th>
                            <th className="text-right">$2000</th>
                            <th className="text-right"></th>
                            <th className="text-right"></th>
                          </tr>
                        </tfoot>
                        <tbody>
                          <tr>
                            <td>1</td>
                              <td className="text-center">
                                <div className="photo">
                                  <img
                                    alt="..."
                                    src={require("../assets/img/tania.jpg")}
                                  />
                                </div>
                              </td>
                              <td>Bitcoin</td>
                              <td>$8000</td>
                              <td className="text-center">2013</td>
                              <td className="text-right">€ 99,225</td>
                              <td className="text-right">31.05.2019</td>
                              <td className="text-right">
                              <Button
                                className="btn-link btn-icon"
                                color="success"
                                id="tooltip324367706"
                                size="sm"
                              >
                                <i className="tim-icons icon-pencil" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip324367706"
                              >
                                Tooltip on top
                              </UncontrolledTooltip>
                              <Button
                                className="btn-link"
                                color="danger"
                                id="tooltip974171201"
                                size="sm"
                              >
                                <i className="tim-icons icon-simple-remove" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip974171201"
                              >
                                Tooltip on top
                              </UncontrolledTooltip>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
                </Row>
              </div>
            </TabPane>
          )
        })
      )
    }

    return (
      <>
        <div className="content">
        {this.state.alert}
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <Card className="card-plain card-subcategories">
                <CardBody>
                  {/* color-classes: "nav-pills-primary", "nav-pills-info", "nav-pills-success", "nav-pills-warning","nav-pills-danger" */}
                  <Nav
                    className="nav-pills-info nav-pills-icons justify-content-center"
                    pills
                  >
                    {TabHeader()}
                    <CreatePortfolio />
                  </Nav>
                  <TabContent
                    className="tab-space tab-subcategories"
                    activeTab={this.state.pageTabs}
                  >
                    {TabBody()}
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    portfolios: state.firestore.ordered.portfolio
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'portfolio', orderBy: ["createDate", "asc"]}
  ])
)(Portfolio);
