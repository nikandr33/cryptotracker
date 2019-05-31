import React, { Component } from "react";

// react component for creating dynamic tables
import ReactTable from "react-table";
import {
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";

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

class CoinsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data.map((prop, key) => {
        return {
            id: key+1,
            imgUrl: imgPath+prop.RAW.USD.IMAGEURL,
            coinName: prop.CoinInfo.FullName,
            mktcap: prop.RAW.USD.MKTCAP,
            supply: prop.RAW.USD.SUPPLY, //number_format(prop.RAW.USD.SUPPLY, 0, '.', ' ') + prop.RAW.USD.FROMSYMBOL,
            symbol: prop.RAW.USD.FROMSYMBOL,
            change24: prop.RAW.USD.CHANGEPCT24HOUR, //decimalAdjust('floor', prop.RAW.USD.CHANGEPCT24HOUR, -2) + "%",
            price: prop.RAW.USD.PRICE //"$" + (prop.RAW.USD.PRICE > 1 ? number_format(prop.RAW.USD.PRICE, 2, '.', ' ') : number_format(prop.RAW.USD.PRICE, 6, '.', ' '))
        };
      })
    };
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <CardBody>
                  <ReactTable
                    data={this.state.data}
                    filterable
                    resizable={false}
                    columns={[
                      {
                        Header: "#",
                        accessor: "id"
                      },
                      {
                        Header: "",
                        accessor: "imgUrl",
                        Cell: (row) => {
                            return <img height={34} alt="#" src={row.original.imgUrl}/>
                        },
                        sortable: false,
                        filterable: false
                      },
                      {
                        Header: "Coin",
                        accessor: "coinName",
                        sortable: false
                      },
                      {
                        Header: "Market Cap",
                        accessor: "mktcap",
                        Cell: (row) => {
                            return "$" + number_format(row.value, 2, '.', ' ')
                        },
                        filterable: false
                      },
                      {
                        Header: "Supply",
                        accessor: "supply",
                        Cell: (row) => {
                            return number_format(row.original.supply, 0, '.', ' ') + " " + row.original.symbol
                        },
                        filterable: false
                      },
                      {
                        Header: "Change 24h",
                        accessor: "change24",
                        Cell: (row) => {
                            return decimalAdjust('floor', row.original.change24, -2) + "%"
                        },
                        filterable: false
                      },
                      {
                        Header: "Price",
                        accessor: "price",
                        Cell: (row) => {
                            return "$" + (row.original.price > 1 ? number_format(row.original.price, 2, '.', ' ') : number_format(row.original.price, 6, '.', ' '))
                        },
                        filterable: false
                      }
                    ]}
                    defaultPageSize={100}
                    
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default CoinsTable;
