import React from "react";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import auth from "../API/auth";

export default class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      name: "",
      surname: "",
      invalid: {
        login: false,
        password: false,
        name: false,
        surname: false,
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const text = e.target.value;
    const field = e.target.name;
    this.setState(() => ({[field]: text}))
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      login: this.state.login,
      password: this.state.password,
      name: this.state.name,
      surname: this.state.surname
    };

    const newState = Object.assign({}, this.state);
    for (let key in data) {
      if (data[key] === "") {
        newState.invalid[key] = true;
        this.setState(() => (newState));
      } else {

        newState.invalid[key] = false;
        this.setState(() => (newState));
      }
    }

    for (let key in data) {
      if (data[key] === "") {
        return;
      }
    }

    auth.register(data, () => {
      this.props.history.push('/');
    });
  }

  render() {
    return [
      <Row>
        <h1>Register</h1>
      </Row>,
      <hr/>,
      <Row>
        <Col md="8" lg="5">
          <Form>
            <FormGroup>
              <Label className="m-0" for="inputName">Name</Label>
              <Input
                invalid={this.state.invalid.name}
                onChange={this.handleChange}
                className="m-2"
                type="text"
                id="inputName"
                name="name"
                placeholder="Name"
                value={this.state.name}/>
            </FormGroup>
            <FormGroup>
              <Label className="m-0" for="inputSurname">Surname</Label>
              <Input
                invalid={this.state.invalid.surname}
                onChange={this.handleChange}
                className="m-2"
                type="text"
                id="inputSurname"
                name="surname"
                placeholder="Surname"
                value={this.state.surname}/>
            </FormGroup>
            <FormGroup>
              <Label className="m-0" for="inputLogin">Login</Label>
              <Input
                invalid={this.state.invalid.login}
                onChange={this.handleChange}
                className="m-2"
                type="text"
                id="inputLogin"
                name="login"
                placeholder="Login"
                value={this.state.login}/>
            </FormGroup>
            <FormGroup>
              <Label className="m-0" for="inputPassword">Password</Label>
              <Input
                invalid={this.state.invalid.password}
                onChange={this.handleChange}
                className="m-2"
                type="password"
                id="inputPassword"
                name="password"
                placeholder="Password"
                value={this.state.password}/>
            </FormGroup>
            <Button onClick={this.handleSubmit} color="primary" className="mt-5">Register</Button>
          </Form>
        </Col>
      </Row>
    ];
  }
}