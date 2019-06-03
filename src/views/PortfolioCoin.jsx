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

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import axios from "axios";

import { changeCoin, deleteCoin } from "../store/actions/coinsActions";

import { number_format, decimalAdjust} from "../format_numbers"

class PortfolioCoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
      }

    calculateEconomy() {
        let url = "https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=" + this.props.coin.coin_info.symb + "&tsym=" + this.props.coin.currency.label;
        axios.get(url)
        .then(res => {
            let hold = parseInt(this.props.coin.amount,10) * res.data.Data.AggregatedData.PRICE;
            let pl = Math.abs((parseInt(this.props.coin.amount,10) * parseInt(this.props.coin.buy_price)) - (parseInt(this.props.coin.amount,10) * res.data.Data.AggregatedData.PRICE));
            let chng = ( Math.abs(parseInt(this.props.coin.buy_price) - res.data.Data.AggregatedData.PRICE) *100)/res.data.Data.AggregatedData.PRICE;
            pl = parseInt(hold,10) > parseInt(this.props.coin.buy_price,10) ? pl : -pl;
            chng = parseInt(hold,10) > parseInt(this.props.coin.buy_price,10) ? Math.abs(chng) : -Math.abs(chng);
            hold = hold > 1 ? number_format(hold, 2, '.', ' ') : number_format(hold, 6, '.', ' ');
            chng = number_format(chng, 2, '.', ' ');
            pl = number_format(pl, 2, '.', ' ')
            
            this.setState({ holding: hold, change: chng, profit_loss: pl })
        })
    }

    componentWillMount() {
        this.calculateEconomy();
        this.getCoinsData();
    }

    componentWillUpdate() {
        this.calculateEconomy();
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
            <tr>
                <td>{this.props.num + 1}</td>
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
                <td className="text-right">{this.props.coin.date_buy !== null ? moment(this.props.coin.date_buy.toDate()).format('DD/MM/YYYY') : null }</td>
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
                        onClick={() => this.props.deleteCoin(this.props.coin.id)}
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
