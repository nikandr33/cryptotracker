import React from "react";

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
      registerConfirmPasswordState: "",
      // login form
      loginFullName: "",
      loginEmail: "",
      loginPassword: "",
      loginFullNameState: "",
      loginEmailState: "",
      loginPasswordState: "",
      // type validation form
      required: "",
      email: "",
      number: "",
      url: "",
      source: "",
      destination: "",
      requiredState: "",
      emailState: "",
      numberState: "",
      urlState: "",
      sourceState: "",
      destinationState: "",
      // range validation form
      minLength: "",
      maxLength: "",
      range: "",
      min: "",
      max: "",
      minLengthState: "",
      maxLengthState: "",
      rangeState: "",
      minState: "",
      maxState: ""
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
  // function that verifies if value contains only numbers
  verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  // verifies if value is a valid URL
  verifyUrl = value => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };
  change = (event, stateName, type, stateNameEqualTo, maxValue) => {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
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
      case "number":
        if (this.verifyNumber(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "max-length":
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "url":
        if (this.verifyUrl(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "min-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "max-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "range":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  };
  registerClick = () => {
    if (this.state.registerEmailState === "") {
      this.setState({ registerEmailState: "has-danger" });
    }
    if (
      this.state.registerPasswordState === "" ||
      this.state.registerConfirmPasswordState === ""
    ) {
      this.setState({ registerPasswordState: "has-danger" });
      this.setState({ registerConfirmPasswordState: "has-danger" });
    }
  };
  loginClick = () => {
    if (this.state.loginFullNameState === "") {
      this.setState({ loginFullNameState: "has-danger" });
    }
    if (this.state.loginEmailState === "") {
      this.setState({ loginEmailState: "has-danger" });
    }
    if (this.state.loginPasswordState === "") {
      this.setState({ loginPasswordState: "has-danger" });
    }
  };
  typeClick = () => {
    if (this.state.requiredState === "") {
      this.setState({ requiredState: "has-danger" });
    }
    if (this.state.emailState === "") {
      this.setState({ emailState: "has-danger" });
    }
    if (this.state.numberState === "") {
      this.setState({ numberState: "has-danger" });
    }
    if (this.state.urlState === "") {
      this.setState({ urlState: "has-danger" });
    }
    if (this.state.sourceState === "" || this.state.destinationState === "") {
      this.setState({ sourceState: "has-danger" });
      this.setState({ destinationState: "has-danger" });
    }
  };
  rangeClick = () => {
    if (this.state.minLengthState === "") {
      this.setState({ minLengthState: "has-danger" });
    }
    if (this.state.maxLengthState === "") {
      this.setState({ maxLengthState: "has-danger" });
    }
    if (this.state.rangeState === "") {
      this.setState({ rangeState: "has-danger" });
    }
    if (this.state.minValueState === "") {
      this.setState({ minValueState: "has-danger" });
    }
    if (this.state.maxValueState === "") {
      this.setState({ maxValueState: "has-danger" });
    }
    if (this.state.minState === "") {
      this.setState({ minState: "has-danger" });
    }
    if (this.state.maxState === "") {
      this.setState({ maxState: "has-danger" });
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
              <Form id="RegisterValidation">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Register Form</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <FormGroup className={`has-label ${registerEmailState}`}>
                      <label>Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        onChange={e => this.change(e, "registerEmail", "email")}
                      />
                      {this.state.registerEmailState === "has-danger" ? (
                        <label className="error">
                          Please enter a valid email address.
                        </label>
                      ) : null}
                    </FormGroup>
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
                    <div className="category form-category">
                      * Required fields
                    </div>
                  </CardBody>
                  <CardFooter className="text-left">
                    <Button color="primary" onClick={this.registerClick}>
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

export default ValidationForms;
