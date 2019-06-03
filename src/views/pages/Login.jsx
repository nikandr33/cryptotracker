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
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  ModalFooter
} from "reactstrap";

import { Link } from "react-router-dom";
import fire from "../../fire"
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      modal: false,
      recoveryStatus: null
    }
    this.recovery = this.recovery.bind(this);
  }

  login(e) {
    e.preventDefault();
    let user = {};
    user.email = this.state.email;
    user.password = this.state.password;
    this.props.signIn(user);
  }

  recovery = () => {
    fire.auth().sendPasswordResetEmail(this.state.email)
    .then(() => {
      this.setState({ recoveryStatus: "Recovery letter successful sended to your email." })
    }).catch((err) => {
      this.setState({ recoveryStatus: err.message })
    });
    
  }

  toggle = e => {
    e.preventDefault();
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Recovery Password</ModalHeader>
          <ModalBody>
              <Form action="#">
                  <label>Email</label>
                  <FormGroup>
                      <Input type="text" onChange={e => this.handleChange(e)} name="email" value={this.state.email} />
                  </FormGroup>
              </Form>
              <label>
                {this.state.recoveryStatus}
              </label>
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={() => this.recovery()}>Sumbit</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
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
                          onClick={(e) => this.toggle(e)}
                        >
                          Forgot your password?
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
