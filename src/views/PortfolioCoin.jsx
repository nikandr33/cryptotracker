import React from "react";
import moment from "moment";
// reactstrap components
import {
  Button,
  UncontrolledTooltip,
} from "reactstrap";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import axios from "axios";

import { deleteCoin } from "../store/actions/coinsActions";

import { number_format, decimalAdjust} from "../format_numbers"

class PortfolioCoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        total_value: null,
        profit_loss: null
    };
  }

  componentWillMount() {
    let url = "https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=" + this.props.coin.coin_id.symb + "&tsym=USD"
    axios.get(url)
    .then(res => {
        let total = this.props.coin.amount * res.data.Data.AggregatedData.PRICE;
        let pl = Math.abs(this.props.coin.buy_price - res.data.Data.AggregatedData.PRICE);
        pl = (pl*100)/res.data.Data.AggregatedData.PRICE;
        total = total > 1 ? number_format(total, 2, '.', ' ') : number_format(total, 6, '.', ' ');
        pl = pl > 1 ? number_format(pl, 2, '.', ' ') : number_format(pl, 6, '.', ' ');
        this.setState({ total_value: total, profit_loss: pl })
    })
    
  }

  render() {
    return (
      <>
        <tr>
            <td>{this.props.num + 1}</td>
            <td className="text-center">
                <div className="photo">
                    <img
                    alt="..."
                    src={"https://www.cryptocompare.com/" + this.props.coin.coin_id.imageUrl}
                    />
                </div>
            </td>
            <td>{this.props.coin.coin_id.label}</td>
            <td>${this.props.coin.buy_price}</td>
            <td className="text-center">{this.props.coin.amount}</td>
            <td className="text-center">{this.state.total_value}</td>
            <td className="text-right">{this.state.profit_loss} %</td>
            <td className="text-right">{moment(this.props.coin.date_buy.toDate()).format('DD/MM/YYYY')}</td>
            <td className="text-right">
                <Button
                    className="btn-link btn-icon"
                    color="success"
                    id={"tooltip" + this.props.num}
                    size="sm"
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
    return bindActionCreators(Object.assign({}, { deleteCoin: deleteCoin }), dispatch) //, { changePortfolio: changePortfolio }
  }

export default connect(null, mapDispatchToProps)(PortfolioCoin);
