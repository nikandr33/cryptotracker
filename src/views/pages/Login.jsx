import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  login(e) {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    document.body.classList.toggle("login-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }
  render() {
    const { signInError } = this.props; 
    return (
      <>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form className="form">
                <Card className="card-login card-white">
                  <CardHeader>
                    <img
                      alt="..."
                      src={require("../../assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h1">Log in</CardTitle>
                  </CardHeader>
                  <CardBody>
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
                    {signInError ? <span className="text-danger font-weight-bold">{signInError.message}</span> : null}
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="mb-3"
                      color="primary"
                      onClick={e => this.login(e)}
                      size="lg"
                    >
                      Get Started
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <Link
                          className="link footer-link"
                          to="/auth/register"
                        >
                          Create Account
                        </Link>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link footer-link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signInError: state.auth.signInError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
