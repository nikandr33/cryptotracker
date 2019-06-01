import React from "react";

import axios from "axios";

import CoinsTable from "./CoinsTable";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

class CoinsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinsData: [],
      isLoading: true
    };
  }

  setCoinsData = data => {
    this.setState({
      coinsData: data,
      isLoading: false
    }, () => console.log(this.state.coinsData));
  }

  showCoinsData() {
    console.log(this.state.coinsData);
  }

  componentWillMount () {
    this.getCoinsData();
  }

  getCoinsData () {
    axios.get("https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=eb9a602cceebc71a33b56cbefc89a9152428c3532464077f3d775ee3d315c670")
    .then(res => this.setCoinsData(res.data.Data))
    .catch(e => console.log(e))
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            {!this.state.isLoading &&
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Listing Of Coins</CardTitle>
                  </CardHeader>
                  <CardBody>
                    {
                      <CoinsTable data={this.state.coinsData} />
                    }
                </CardBody>
              </Card>
            </Col>
            }
          </Row>
        </div>
      </>
    );
  }
}

export default CoinsPage;
