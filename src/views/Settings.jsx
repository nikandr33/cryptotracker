import React from "react";

import fire from "../fire"

import { connect } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class ValidationForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // register form
      registerEmail: "",
      registerPassword: "",
      registerConfirmPassword: "",
      registerEmailState: "",
      registerPasswordState: "",
      registerConfirmPasswordState: ""
    };
  }
  // function that returns true if value is email, false otherwise
  verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  // function that verifies if two strings are equal
  compare = (string1, string2) => {
    if (string1 === string2) {
      return true;
    }
    return false;
  };

  componentWillMount() {
    this.setState({ registerEmail: this.props.auth.email })
  }

  change = (event, stateName, type, stateNameEqualTo) => {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 6)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "has-success" });
          this.setState({ [stateNameEqualTo + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
          this.setState({ [stateNameEqualTo + "State"]: "has-danger" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  };
  passwordChangeClick = () => {
    if (
      this.state.registerPasswordState === "" ||
      this.state.registerConfirmPasswordState === ""
    ) {
      this.setState({ registerPasswordState: "has-danger" });
      this.setState({ registerConfirmPasswordState: "has-danger" });
    }
      this.submitPassword()
  };

  submitPassword = () => {
    if (
      this.state.registerPasswordState !== "has-danger" ||
      this.state.registerConfirmPasswordState !== "has-danger"
    ) {
      this.setState({ registerPasswordState: "has-success" });
      this.setState({ registerConfirmPasswordState: "has-success" });
      
      fire.auth().currentUser.updatePassword(this.state.registerPassword)
      .then(() => {
        this.setState({ registerPassword: "success" })
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  emailChangeClick = () => {
    if (this.state.registerEmailState === "") {
      this.setState({ registerEmailState: "has-danger" });
    }
    if (this.state.registerEmailState !== "has-danger") {
      fire.auth().currentUser.updateEmail(this.state.registerEmail)
      .then(() => {
        this.setState({ registerEmailState: "success" });
      })
      .catch((err) => {
        console.log(err);
      })
    }
    
  };

  render() {
    // taking all the states
    let {
      // register form
      registerEmailState,
      registerPasswordState,
      registerConfirmPasswordState,
    } = this.state;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Form id="EmailChangeValidation">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Change Email</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <FormGroup className={`has-label ${registerEmailState}`}>
                      <label>Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        value={this.state.registerEmail}
                        onChange={e => this.change(e, "registerEmail", "email")}
                      />
                      {this.state.registerEmailState === "has-danger" ? (
                        <label className="error">
                          Please enter a valid email address.
                        </label>
                      ) : null}
                    </FormGroup>
                    {this.state.registerEmailState === "success" ? (
                        <label className="text-success">
                          Email Successful Changed
                        </label>
                      ) : null}
                  </CardBody>
                  <CardFooter className="text-left">
                    <Button color="primary" onClick={this.emailChangeClick}>
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
              <Form id="PasswordChangeValidation">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Change Password</CardTitle>
                  </CardHeader>
                  <CardBody>
                  <FormGroup className={`has-label ${registerPasswordState}`}>
                      <label>Password *</label>
                      <Input
                        id="registerPassword"
                        name="password"
                        type="password"
                        autoComplete="off"
                        onChange={e =>
                          this.change(e, "registerPassword", "password")
                        }
                      />
                      {this.state.registerPasswordState === "has-danger" ? (
                        <label className="error">This field is required.</label>
                      ) : null}
                    </FormGroup>
                    <FormGroup
                      className={`has-label ${registerConfirmPasswordState}`}
                    >
                      <label>Confirm Password *</label>
                      <Input
                        equalto="#registerPassword"
                        id="registerPasswordConfirmation"
                        name="password_confirmation"
                        type="password"
                        autoComplete="off"
                        onChange={e =>
                          this.change(
                            e,
                            "registerConfirmPassword",
                            "equalTo",
                            "registerPassword"
                          )
                        }
                      />
                      {this.state.registerConfirmPasswordState ===
                      "has-danger" ? (
                        <label className="error">This field is required.</label>
                      ) : null}
                    </FormGroup>
                    {this.state.registerPassword === "success" ? (
                        <label className="text-success">
                          Password Successful Changed
                        </label>
                      ) : null}
                  </CardBody>
                  <CardFooter className="text-left">
                    <Button color="primary" onClick={this.passwordChangeClick}>
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(ValidationForms);
