import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col
} from "reactstrap";

const dataTable = [
  ["Airi Satou", "Accountant", "Tokyo", "33"],
  ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "47"],
  ["Ashton Cox", "Junior Technical Author", "San Francisco", "66"],
  ["Bradley Greer", "Software Engineer", "London", "41"],
  ["Brenden Wagner", "Software Engineer", "San Francisco", "28"],
  ["Brielle Williamson", "Integration Specialist", "New York", "61"],
  ["Caesar Vance", "Pre-Sales Support", "New York", "21"],
  ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22"],
  ["Charde Marshall", "Regional Director", "San Francisco", "36"],
  ["Colleen Hurst", "Javascript Developer", "San Francisco", "39"],
  ["Dai Rios", "Personnel Lead", "Edinburgh", "35"],
  ["Doris Wilder", "Sales Assistant", "Sidney", "23"],
  ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "48"],
  ["Garrett Winters", "Accountant", "Tokyo", "63"],
  ["Gavin Cortez", "Team Leader", "San Francisco", "22"],
  ["Gavin Joyce", "Developer", "Edinburgh", "42"],
  ["Gloria Little", "Systems Administrator", "New York", "59"],
  ["Haley Kennedy", "Senior Marketing Designer", "London", "43"],
  ["Herrod Chandler", "Sales Assistant", "San Francisco", "59"],
  ["Hope Fuentes", "Secretary", "San Francisco", "41"],
  ["Howard Hatfield", "Office Manager", "San Francisco", "51"],
  ["Jackson Bradshaw", "Director", "New York", "65"],
  ["Jena Gaines", "Office Manager", "London", "30"],
  ["Jenette Caldwell", "Development Lead", "New York", "30"],
  ["Jennifer Chang", "Regional Director", "Singapore", "28"],
  ["Martena Mccray", "Post-Sales support", "Edinburgh", "46"],
  ["Michael Silva", "Marketing Designer", "London", "66"],
  ["Michelle House", "Integration Specialist", "Sidney", "37"],
  ["Olivia Liang", "Support Engineer", "Singapore", "64"],
  ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "64"],
  ["Prescott Bartlett", "Technical Author", "London", "27"],
  ["Quinn Flynn", "Support Lead", "Edinburgh", "22"],
  ["Rhona Davidson", "Integration Specialist", "Tokyo", "55"],
  ["Shou Itou", "Regional Marketing", "Tokyo", "20"],
  ["Sonya Frost", "Software Engineer", "Edinburgh", "23"],
  ["Suki Burks", "Developer", "London", "53"],
  ["Tatyana Fitzpatrick", "Regional Director", "London", "19"],
  ["Timothy Mooney", "Office Manager", "London", "37"],
  ["Unity Butler", "Marketing Designer", "San Francisco", "47"],
  ["Vivian Harrell", "Financial Controller", "San Francisco", "62"],
  ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "40"],
  ["Tiger Nixon", "System Architect", "Edinburgh", "61"]
];

class ReactTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataTable.map((prop, key) => {
        return {
          id: key,
          name: prop[0],
          position: prop[1],
          office: prop[2],
          age: prop[3],
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
                <CardHeader>
                  <CardTitle tag="h4">React Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.data}
                    filterable
                    resizable={false}
                    columns={[
                      {
                        Header: "Name",
                        accessor: "name",
                        sortable: true,
                        filterable: true
                      },
                      {
                        Header: "Position",
                        accessor: "position",
                        sortable: false,
                        filterable: false
                      },
                      {
                        Header: "Office",
                        accessor: "office",
                        sortable: false,
                        filterable: false
                      },
                      {
                        Header: "Age",
                        accessor: "age",
                        sortable: false,
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

export default ReactTables;
