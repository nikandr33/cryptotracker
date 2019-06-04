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
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input
} from "reactstrap";

import Select from "react-select";
import axios from "axios";
import ReactBSAlert from "react-bootstrap-sweetalert";
import ReactDatetime from "react-datetime";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { bindActionCreators } from 'redux';
import CreatePortfolio from "./CreatePortfolio";
import PortfolioCoin from "./PortfolioCoin";
import { deletePortfolio, changePortfolio } from "../store/actions/portfolioActions";
import { addCoin } from "../store/actions/coinsActions";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTabs: "1",
      alert: null,
      modal: false,
      modalAddCoin: false,
      name: "",
      description: "",
      idCoin: null,
      dataCoins: [],
      date: "",
      amount: null,
      buy_price: null,
      currency: null,
      exchange: null

    };
    this.toggle = this.toggle.bind(this);
    this.toggleAddCoinModal = this.toggleAddCoinModal.bind(this);
    this.handleChangeDatePicker = this.handleChangeDatePicker.bind(this);
  }
  warningOnDeletePortfolio = id => {
    this.setState({
      alert: (
        <ReactBSAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => this.successDelete(id)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
          btnSize=""
        >
          You will not be able to recover your portfolio!
        </ReactBSAlert>
      )
    });
  };
  successDelete = id => {
    this.props.deletePortfolio(id);
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Deleted!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="success"
          btnSize=""
        >
          Your portfolio has been deleted.
        </ReactBSAlert>
      )
    });
  };
  hideAlert = () => {
    this.setState({
      alert: null
    });
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleAddCoinModal() {
    this.setState(prevState => ({
      modalAddCoin: !prevState.modalAddCoin
    }));
  }

  getPortfolioData(id) {
    this.props.portfolios.map((item) => {
      if(item.id === id) {
        this.setState({ name: item.name, description: item.desc, exchange: item.exchange }, () => this.toggle())
      }
    })
  }

  submitChangePortfolio(id) {
    let temp = {};
    temp.name = this.state.name;
    temp.desc = this.state.description;
    temp.exchange = this.state.exchange;
    this.props.changePortfolio(id, temp);
    this.toggle();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChangeDatePicker(date) {
    this.setState({
      date: date._d
    })
  }

  componentWillMount() {
    this.getCoinsData();
    if(this.props.portfolios) {
      if(this.props.portfolios.find(portfolio => portfolio.uid === this.props.user.uid))
        this.setState({ pageTabs: this.props.portfolios.find(portfolio => portfolio.uid === this.props.user.uid).id })
    }
  }

  getCoinsData () {
    axios.get("https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=eb9a602cceebc71a33b56cbefc89a9152428c3532464077f3d775ee3d315c670")
    .then(res => this.setState({ dataCoins: res.data.Data }))
    .catch(e => console.log(e))
  }

  submitAddCoin(pid) {
    let coin = {};
    coin.coin_info = this.state.idCoin;
    coin.amount = this.state.amount;
    coin.buy_price = this.state.buy_price;
    coin.date_buy = this.state.date;
    coin.currency = this.state.currency;
    this.props.addCoin(coin, pid);
    this.toggleAddCoinModal();
  }
  
  // with this function we change the active tab for all the tabs in this page
  changeActiveTab = (e, tabState, tadName) => {
    e.preventDefault();
    this.setState({
      [tabState]: tadName
    });
  };

  render() {
    const TabHeader = () => {
      return (
        this.props.portfolios && this.props.portfolios.map((prop, key) => {
          if(this.props.user.uid === prop.uid) {
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
          }
        })
      )
    }

    const nameExchange = ex => {
      if(ex !== "")
        return <span> | Exchange: {ex.label} </span>
      else 
        return <span> | Exchange: None </span>
    } 

    const portfolioDescr = descr => {
      if(descr !== "")
        return <>| <i>{descr}</i></>
      else
        return "";
    }

    const TabBody = () => {
      return (
        this.props.portfolios && this.props.portfolios.map((prop, key) => {
          if(this.props.user.uid === prop.uid) {
            let countCoin = 0;
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
                                  onClick={() => this.toggleAddCoinModal()}
                                >
                                  Add coin
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => this.getPortfolioData(prop.id)}
                                >
                                  Change Portfolio
                                </DropdownItem>
                                <DropdownItem
                                  className="text-danger"
                                  onClick={() => this.warningOnDeletePortfolio(prop.id)} 
                                >
                                  Delete Portfolio
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                          <CardTitle tag="h4">{prop.name} {portfolioDescr(prop.desc)} {nameExchange(prop.exchange)} </CardTitle>
                        </CardHeader>
                        <CardBody>
                          <Table responsive>
                            <thead className="text-primary">
                              <tr>
                                <th className="text-center">#</th>
                                <th className="text-center"></th>
                                <th>Coin</th>
                                <th>Buy Price</th>
                                <th className="text-center">Amount</th>
                                <th className="text-center">Holding</th>
                                <th className="text-right">Profit/Loss</th>
                                <th className="text-right">Change</th>
                                <th className="text-right">Date Buy</th>
                                <th className="text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.coins && this.props.coins.map((coin, key) => {
                                if(coin.pid === prop.id) {
                                  countCoin++;
                                  return (<PortfolioCoin exchange={prop.exchange} coin={coin} num={countCoin} key={key} />)
                                }
                              })}
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </TabPane>
            )
          }
        })
      )
    }
    
    return (
      <>
        <div className="content">
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
                    {this.state.alert}
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                      <ModalHeader toggle={this.toggle}>Portfolio Changing Form</ModalHeader>
                      <ModalBody>
                          <Form action="#">
                              <label>Name</label>
                              <FormGroup>
                                  <Input type="text" onChange={e => this.handleChange(e)} name="name" value={this.state.name} />
                              </FormGroup>
                              <label>Description</label>
                              <FormGroup>
                                  <Input type="textarea" onChange={e => this.handleChange(e)} name="description" value={this.state.description} />
                              </FormGroup>
                              <label>Exchange</label>
                              <FormGroup>
                                <Select
                                    className="react-select info"
                                    classNamePrefix="react-select"
                                    name="exchange"
                                    value={this.state.exchange}
                                    onChange={value =>
                                        this.setState({ exchange: value })
                                    }
                                    options={[
                                        { value: "0", label: "None" },
                                        { value: "1", label: "Binance" },
                                        { value: "2", label: "EXMO" },
                                        { value: "4", label: "Bitfinex" },
                                        { value: "5", label: "KuCoin" },
                                        { value: "5", label: "Bitforex" },
                                    ]}
                                    placeholder="Choose Exchange"
                                />
                            </FormGroup>
                          </Form>
                      </ModalBody>
                      <ModalFooter>
                          <Button color="primary" onClick={() => this.submitChangePortfolio(this.state.pageTabs)}>Save</Button>{' '}
                          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalAddCoin} toggle={this.toggleAddCoinModal} className={this.props.className}>
                      <ModalHeader toggle={this.toggleAddCoinModal}>Coin Adding Form</ModalHeader>
                      <ModalBody>
                          <Form action="#">
                            <Row>
                              <Col>
                                <Select
                                  className="react-select info"
                                  classNamePrefix="react-select"
                                  name="idCoin"
                                  value={this.state.idCoin}
                                  onChange={value =>
                                    this.setState({ idCoin: value })
                                  }
                                  options={this.state.dataCoins.map((raw, key) => {
                                    return {value: raw.CoinInfo.Id, label: raw.CoinInfo.FullName, imageUrl: raw.CoinInfo.ImageUrl, symb: raw.CoinInfo.Name}
                                  })}
                                  placeholder="Choose Coin"
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col className="mt-2" lg="6" md="6" sm="6">
                                <label>Amount</label>
                                <FormGroup>
                                    <Input type="text" onChange={e => this.handleChange(e)} name="amount" value={this.state.amount} />
                                </FormGroup>
                              </Col>
                              <Col className="mt-2" lg="6" md="6" sm="6">
                                <label>Buy Price</label>
                                <FormGroup>
                                    <Input type="text" onChange={e => this.handleChange(e)} name="buy_price" value={this.state.buy_price} />
                                </FormGroup>
                              </Col>
                              </Row>
                              <Row>
                              <Col lg="6" md="6" sm="6" className="mt-2">
                                <label>Bought On</label>
                                <FormGroup>
                                  <ReactDatetime
                                    inputProps={{
                                      className: "form-control",
                                      placeholder: "Date Picker Here"
                                    }}
                                    timeFormat={false}
                                    dateFormat={"DD/MM/YYYY"}
                                    name="date"
                                    selected={ this.state.date }
                                    onChange={ this.handleChangeDatePicker }
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6" md="6" sm="6" className="mt-2">
                                <label>Currency</label>
                                <FormGroup>
                                  <Select
                                    className="react-select info"
                                    classNamePrefix="react-select"
                                    name="currency"
                                    value={this.state.currency}
                                    onChange={value =>
                                      this.setState({ currency: value })
                                    }
                                    options={[
                                      { value: "1", label: "USD" },
                                      { value: "2", label: "RUB" },
                                      { value: "4", label: "BTC" },
                                      { value: "5", label: "ETH" },
                                      { value: "5", label: "USDT" },
                                    ]}
                                    placeholder="Choose Currency"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>
                      </ModalBody>
                      <ModalFooter>
                          <Button color="primary" onClick={() => this.submitAddCoin(this.state.pageTabs)}>Add</Button>{' '}
                          <Button color="secondary" onClick={this.toggleAddCoinModal}>Cancel</Button>
                      </ModalFooter>
                    </Modal>

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
    portfolios: state.firestore.ordered.portfolio,
    user: state.firebase.auth,
    coins: state.firestore.ordered.coins
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, { deletePortfolio: deletePortfolio }, { changePortfolio: changePortfolio }, { addCoin: addCoin }), dispatch)
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'portfolio', orderBy: ["createDate", "asc"]},
    { collection: 'coins', orderBy: ["createDate", "asc"]}
  ])
)(Portfolio);
