import React from "react";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import errors from "../API/errors";
import {state} from "..";
import {Redirect} from "react-router-dom";

export default class CreateError extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: {
        shortDescription: "",
        description: "",
        urgency: 0,
        criticality: 0
      },
      invalid: {
        shortDescription: false,
        description: false
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const text = e.target.value;
    const field = e.target.name;
    this.setState((prevState) => ({error: {...prevState.error, [field]: text}}))
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.error.description === "" || this.state.error.shortDescription === "") {
      this.setState((prevState) => ({
        invalid: {
          description: prevState.error.description === "",
          shortDescription: prevState.error.shortDescription === ""
        }
      }));
      return;
    }

    this.setState(() => ({
      invalid: {
        description: false,
        shortDescription: false
      }
    }));

    errors.create(this.state.error, this.props.onCreated);

    this.props.history.push('/errors');
  }

  render() {
    if (!state.user.authenticated) {
      return <Redirect to="/login"/>
    }

    return [
      <Row>
        <h1>Create Error</h1>
      </Row>,
      <hr/>,
      <Row>
        <Col>
          <Form>
            <FormGroup>
              <Label className="m-0" for="inputShortDescription">Short description</Label>
              <Input
                invalid={this.state.invalid.shortDescription}
                onChange={this.handleChange}
                className="m-2"
                type="text"
                id="inputShortDescription"
                name="shortDescription"
                placeholder="Short description"
                value={this.state.error.shortDescription}/>
            </FormGroup>
            <FormGroup>
              <Label className="m-0" for="inputDescription">Description</Label>
              <Input
                invalid={this.state.invalid.description}
                onChange={this.handleChange}
                className="m-2"
                type="textarea"
                id="inputDescription"
                name="description"
                placeholder="Description"
                value={this.state.error.description}/>
            </FormGroup>
            <FormGroup>
              <Label className="m-0" for="inputUrgency">Urgency</Label>
              <Input
                onChange={this.handleChange}
                className="m-2"
                type="select"
                id="inputUrgency"
                name="urgency"
                placeholder="Urgency"
                value={this.state.error.urgency}
              >
                {errors.urgency.map((item, v) => (
                  <option value={v}>{item}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label className="m-0" for="inputCriticality">Criticality</Label>
              <Input
                onChange={this.handleChange}
                className="m-2"
                type="select"
                id="inputCriticality"
                name="criticality"
                placeholder="Criticality"
                value={this.state.error.criticality}
              >
                {errors.criticality.map((item, v) => (
                  <option value={v}>{item}</option>
                ))}
              </Input>
            </FormGroup>
            <Button onClick={this.handleSubmit} color="primary" className="mt-3">Create</Button>
          </Form>
        </Col>
      </Row>
    ];
  }
}