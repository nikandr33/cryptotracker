import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from "reactstrap";

class NewsList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const NewsFeed = () => {
        return(
          this.props.data.map(function(item, i) {
            return (
            <div className="typography-line" key={i}>
                <h2 className="d-flex align-items-center justify-content-between">
                  <div className="col-2"><a href={item.url} rel="noopener noreferrer" target="_blank"><img src={item.imageurl} width="125px" alt=""/></a></div>
                  <div className="col-10"><small><a href={item.url} rel="noopener noreferrer" target="_blank" ><p className="news-link">{item.title}</p></a></small></div>
                </h2>
              </div>
            );
          })
        );
      }

      return(
        <Card>
            <CardHeader className="mb-5">
                <h5 className="card-category">Latest News Crypto Articles </h5>
                <CardTitle tag="h3">
                    News Feed
                </CardTitle>
            </CardHeader>
            <CardBody className="d-flex flex-wrap">
                {NewsFeed()}
            </CardBody>
        </Card>
      );
    } 
}

export default NewsList;