import React from "react";

import {
  Table
} from "reactstrap";

import { number_format, decimalAdjust} from "../format_numbers"

class CoinsList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const CoinRow = () => {
        return(
          this.props.data.map(function(item, i) {
            const imgPath = "https://www.cryptocompare.com/";

            return (
              <tr key={i}>
                <td className="text-center">{i+1}</td>
                <td className="text-center"><img src={imgPath + item.RAW.USD.IMAGEURL} style={{minWidth: 25}} width="40px" alt="btc"/></td>
                <td className="text-center">{item.CoinInfo.FullName}</td>
                <td className="text-center">${number_format(item.RAW.USD.MKTCAP, 2, '.', ' ')}</td>
                <td className="text-center">{number_format(item.RAW.USD.SUPPLY, 0, '.', ' ')} {item.RAW.USD.FROMSYMBOL}</td>
                <td className="text-center">{decimalAdjust('floor', item.RAW.USD.CHANGEPCT24HOUR, -2)}%</td>
                <td className="text-center">${item.RAW.USD.PRICE > 1 ? number_format(item.RAW.USD.PRICE, 2, '.', ' ') : number_format(item.RAW.USD.PRICE, 6, '.', ' ')}</td>
              </tr>
            );
          })
        );
      }

      return(
        
            <Table className="tablesorter" responsive>
              <thead className="text-primary">
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center"></th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Market Cap</th>
                  <th className="text-center">Circulating Supply</th>
                  <th className="text-center">Change 24h</th>
                  <th className="text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {CoinRow()}
              </tbody>
            </Table>
      );
    } 
}

export default CoinsList;