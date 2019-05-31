import React from "react";

import {
  Table
} from "reactstrap";

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

            function decimalAdjust(type, value, exp) {
              // Если степень не определена, либо равна нулю...
              if (typeof exp === 'undefined' || +exp === 0) {
                return Math[type](value);
              }
              value = +value;
              exp = +exp;
              // Если значение не является числом, либо степень не является целым числом...
              if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
                return NaN;
              }
              // Сдвиг разрядов
              value = value.toString().split('e');
              value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
              // Обратный сдвиг
              value = value.toString().split('e');
              return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
            }

            function number_format(number, decimals, dec_point, thousands_sep) {
                number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
                var n = !isFinite(+number) ? 0 : +number,
                  prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                  sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                  dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                  s = '',
                  toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + (Math.round(n * k) / k)
                      .toFixed(prec);
                  };
                // Fix for IE parseFloat(0.55).toFixed(0) = 0;
                s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
                  .split('.');
                if (s[0].length > 3) {
                  s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
                }
                if ((s[1] || '')
                  .length < prec) {
                  s[1] = s[1] || '';
                  s[1] += new Array(prec - s[1].length + 1)
                    .join('0');
                }
                return s.join(dec);
              }

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