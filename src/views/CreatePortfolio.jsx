import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Input } from 'reactstrap';
import Select from "react-select";
import { connect } from "react-redux";

import { createPortfolio } from "../store/actions/portfolioActions";

class CreatePortfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            unmountOnClose: true,
            name: "",
            description: "",
            exchange: ""
        };

        this.toggle = this.toggle.bind(this);
        this.create = this.create.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    create() {
        this.toggle();
        let portf = {};
        portf.name = this.state.name;
        portf.desc = this.state.description;
        portf.exchange = this.state.exchange;
        this.setState({ name: "", description: "", exchange: ""})
        this.props.createPortfolio(portf)
    }
    
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
      }

    render() {
        return (
            <div>
                <Button
                      className="btn-fill"
                      color="info"
                      onClick={this.toggle}
                    >
                      <i className="tim-icons icon-simple-add" />
                    </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Portfolio Adding Form</ModalHeader>
                    <ModalBody>
                        <Form action="#">
                            <label>Name</label>
                            <FormGroup>
                                <Input type="text" onChange={e => this.handleChange(e)} name="name" value={this.state.name} />
                            </FormGroup>
                            <label>Description</label>
                            <FormGroup>
                                <Input type="textarea" onChange={e => this.handleChange(e)} name="description" value={this.state.description} />
                            </FormGroup>
                            <label>Exchange</label>
                            <FormGroup>
                                <Select
                                    className="react-select info"
                                    classNamePrefix="react-select"
                                    name="exchange"
                                    value={this.state.exchange}
                                    onChange={value =>
                                        this.setState({ exchange: value })
                                    }
                                    options={[
                                        { value: "0", label: "None" },
                                        { value: "1", label: "Binance" },
                                        { value: "2", label: "EXMO" },
                                        { value: "4", label: "Bitfinex" },
                                        { value: "5", label: "KuCoin" },
                                        { value: "5", label: "Bitforex" },
                                    ]}
                                    placeholder="Choose Exchange"
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.create}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPortfolio: (portfolio) => dispatch(createPortfolio(portfolio))
    }
}

export default connect(null, mapDispatchToProps)(CreatePortfolio);