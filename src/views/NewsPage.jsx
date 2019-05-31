import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

import axios from "axios";

import NewsList from "./NewsList";

class NewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      isLoading: true
    };
  }

  componentWillMount () {
    this.getNewsData();
  }

  setNewsData = data => {
    this.setState({
      newsData: data,
      isLoading: false
    });
  }

  getNewsData() {
    axios.get("https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=eb9a602cceebc71a33b56cbefc89a9152428c3532464077f3d775ee3d315c670")
    .then(res => this.setNewsData(res.data.Data))
    .catch(e => console.log(e))
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              {!this.state.isLoading && <NewsList data={this.state.newsData} />}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default NewsPage;
