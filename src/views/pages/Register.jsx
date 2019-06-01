import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  signup(e) {
    e.preventDefault();
    this.props.signUp(this.state);
  }

  componentDidMount() {
    document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }
  render() {
    const { signUpError } = this.props; 
    return (
      <>
        <div className="content">
          <Container>
            <Row>
              <Col className="m-auto" md="7">
                <Card className="card-register card-white">
                  <CardHeader>
                    <CardImg
                      alt="..."
                      src={require("../../assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h4">Register</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form className="form">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <input 
                          value={this.state.email}
                          name="email"
                          type="email" 
                          placeholder="Email" 
                          className="form-control"
                          onChange={e => this.handleChange(e)}
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <input 
                          value={this.state.password}
                          name="password"
                          type="password" 
                          placeholder="Password" 
                          className="form-control"
                          onChange={e => this.handleChange(e)}
                        />
                      </InputGroup>
                      <FormGroup check className="text-left">
                        <Label check>
                          <Input type="checkbox" />
                          <span className="form-check-sign" />I agree to the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            terms and conditions
                          </a>
                          .
                        </Label>
                      </FormGroup>
                    </Form>
                    {signUpError ? <span className="text-danger font-weight-bold">{signUpError.message}</span> : null}
                  </CardBody>
                  <CardFooter className="mt-0">
                    <Button
                      className="btn-round"
                      color="primary"
                      onClick={e => this.signup(e)}
                      size="lg"
                    >
                      Get Started
                    </Button>
                    <Link
                      className="link footer-link ml-3"
                      to="/auth/login"
                    >
                      Already have account?
                    </Link>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signUpError: state.auth.signUpError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
