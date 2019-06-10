import React from "react";
import {Button, Form, Input, Row, Col, FormGroup} from "reactstrap";
import auth from "../API/auth";

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      invalid: false
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
      password: this.state.password
    };

    auth.login(data, () => {
      this.props.history.push('/');
    }, () => {
      this.setState(() => ({
        login: "",
        password: "",
        invalid: true,
      }))
    });
  }

  render() {
    return [
      <Row>
        <h1>Login</h1>
      </Row>,
      <hr/>,
      <Row>
        <Col md="8" lg="5">
          <Form>
            {this.state.invalid ?
              <Row>
                <Col>
                  <div className="text-danger">
                    Invalid login or password
                  </div>
                </Col>
              </Row>
              : null}
            <FormGroup>
              <Input
                invalid={this.state.invalid}
                onChange={this.handleChange}
                className="m-2"
                type="text"
                name="login"
                placeholder="Login"
                value={this.state.login}
              />
            </FormGroup>
            <FormGroup>
              <Input
                invalid={this.state.invalid}
                onChange={this.handleChange}
                className="m-2"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
              />
            </FormGroup>
            <Button onClick={this.handleSubmit} color="primary" className="m-2">Login</Button>
          </Form>
        </Col>
      </Row>
    ];
  }
}