import React from "react";
import moment from "moment";
// reactstrap components
import {
  Button,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";

import Select from "react-select";
import ReactDatetime from "react-datetime";
import ReactBSAlert from "react-bootstrap-sweetalert";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import axios from "axios";

import { changeCoin, deleteCoin } from "../store/actions/coinsActions";

import { number_format } from "../format_numbers"

class PortfolioCoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            modal: false,
            holding: null,
            change: null,
            profit_loss: null,
            coinInfo: null,
            date: null,
            _date: null,
            amount: null,
            buy_price: null,
            currency: null,
            dataCoins: []
        };
        this.toggle = this.toggle.bind(this);
        this.handleChangeDatePicker = this.handleChangeDatePicker.bind(this);
    }

    warningOnDeleteCoin = id => {
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
                    You will not be able to recover this coin!
                </ReactBSAlert>
            )
        });
    };

    successDelete = id => {
        this.props.deleteCoin(id);
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
                Coin has been deleted.
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

    calculateEconomy({exchange, coin}) {
        let exchangeUrl = "";
        if(exchange !== "" && exchange.label !== "None" && coin.currency.label !== "RUB" && coin.currency.label !== "USD") {
            exchangeUrl = "&e=" + exchange.label;
        }

        let url = "https://min-api.cryptocompare.com/data/price?fsym=" + coin.coin_info.symb + "&tsyms=" + coin.currency.label + exchangeUrl;
        axios.get(url)
        .then(res => {
            if(res) {
                let curr = 0;
                curr = res.data[coin.currency.label]
                let hold = 0;
                hold = coin.amount * curr;
                let pl = 0;
                pl = Math.abs(hold - (coin.amount * coin.buy_price));
                let chng = 0;
                chng = Math.abs((coin.buy_price - curr) *100) / curr;
                pl = curr > coin.buy_price ? pl : -pl;
                chng = curr > coin.buy_price ? Math.abs(chng) : -Math.abs(chng);
                hold = hold > 1 ? number_format(hold, 2, '.', ' ') : number_format(hold, 6, '.', ' ');
                chng = number_format(chng, 2, '.', ' ');
                
                if(pl > 1 || pl < -1) {
                    pl = number_format(pl, 2, '.', ' ')
                } else {
                    pl = number_format(pl, 4, '.', '')
                } 
                
                this.setState({ holding: hold, change: chng, profit_loss: pl })
            }
        })
    }

    componentWillMount() {
        this.calculateEconomy(this.props);
        this.getCoinsData();
    }

    componentWillReceiveProps(nextProps) {
        this.calculateEconomy(nextProps);
    }

    getCoinsData () {
        axios.get("https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=eb9a602cceebc71a33b56cbefc89a9152428c3532464077f3d775ee3d315c670")
        .then(res => this.setState({ dataCoins: res.data.Data }))
        .catch(e => console.log(e))
    }

    getPortfolioData(id) {
        if(this.props.coin.id === id) {
            this.setState({ coinInfo: this.props.coin.coin_info, date: this.props.coin.date_buy, _date: this.props.coin.date_buy, amount: this.props.coin.amount, buy_price: this.props.coin.buy_price, currency: this.props.coin.currency }, () => this.toggle())
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    handleChangeDatePicker(date) {
        this.setState({
            date: date,
            _date: date._d
        })
    }

    currencyToSymb(curr) {
        switch(curr) {
            case "USD":
                return "$";
            case "RUB":
                return "₽";
            default:
                return curr;
        }
    }

    submitChangeCoin(id) {
        let coin = {};
        coin.coin_info = this.state.coinInfo;
        coin.amount = this.state.amount;
        coin.buy_price = this.state.buy_price;
        coin.date_buy = this.state._date;
        coin.currency = this.state.currency;
        this.props.changeCoin(id, coin);
        this.toggle();
      }

    render() {

        const modal = () => {
            return (
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Coin Changing Form</ModalHeader>
                    <ModalBody>
                        <Form action="#">
                        <Row>
                            <Col>
                            <Select
                                className="react-select info"
                                classNamePrefix="react-select"
                                name="coinInfo"
                                value={this.state.coinInfo}
                                onChange={value =>
                                this.setState({ coinInfo: value })
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
                                        value={ this.state.date !== null ? moment(this.state.date.toDate()).format('DD/MM/YYYY') : null }
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
                        <Button color="primary" onClick={() => this.submitChangeCoin(this.props.coin.id)}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            )
        }

        return (
        <>
            {modal()}
            {this.state.alert}
            <tr>
                <td>{this.props.num}</td>
                <td className="text-center">
                    <div className="photo">
                        <img
                        alt="..."
                        src={"https://www.cryptocompare.com/" + this.props.coin.coin_info.imageUrl}
                        />
                    </div>
                </td>
                <td>{this.props.coin.coin_info.label}</td>
                <td>{this.props.coin.buy_price} {this.currencyToSymb(this.props.coin.currency.label)}</td>
                <td className="text-center">{this.props.coin.amount}</td>
                <td className="text-center">{this.state.holding} {this.currencyToSymb(this.props.coin.currency.label)}</td>
                <td className="text-right">{this.state.profit_loss} {this.currencyToSymb(this.props.coin.currency.label)}</td>
                <td className="text-right">{this.state.change} %</td>
                <td className="text-right">{this.props.coin.date_buy !== "" ? moment(this.props.coin.date_buy.toDate()).format('DD/MM/YYYY') : null }</td>
                <td className="text-right">
                    <Button
                        className="btn-link btn-icon"
                        color="success"
                        id={"tooltip" + this.props.num}
                        size="sm"
                        onClick={() => this.getPortfolioData(this.props.coin.id)}
                    >
                        <i className="tim-icons icon-pencil" />
                    </Button>
                    <UncontrolledTooltip
                        delay={0}
                        target={"tooltip" + this.props.num}
                    >
                        Edit coin
                    </UncontrolledTooltip>
                    <Button
                        className="btn-link"
                        color="danger"
                        id={"tooltip" + this.props.num+1}
                        size="sm"
                        onClick={() => this.warningOnDeleteCoin(this.props.coin.id)}
                    >
                        <i className="tim-icons icon-simple-remove" />
                    </Button>
                    <UncontrolledTooltip
                        delay={0}
                        target={"tooltip" + this.props.num+1}
                    >
                        Delete coin
                    </UncontrolledTooltip>
                </td>
            </tr>
        </>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign({}, { changeCoin: changeCoin }, { deleteCoin: deleteCoin }), dispatch) //, { changePortfolio: changePortfolio }
  }

export default connect(null, mapDispatchToProps)(PortfolioCoin);
