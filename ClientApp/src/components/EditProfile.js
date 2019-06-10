import React from "react";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import auth from "../API/auth";
import {state} from "../index";
import {Redirect} from "react-router-dom";

export default class EditProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      name: this.props.user.name,
      surname: this.props.user.surname,
      invalid: {
        name: false,
        surname: false
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
      login: this.state.login === "" ? null : this.state.login,
      password: this.state.password === "" ? null : this.state.password,
      name: this.state.name,
      surname: this.state.surname
    };
    
    if (data.name === "" || data.surname === "") {
      this.setState(() => ({
        invalid: {
          name: data.name === "",
          surname: data.surname === ""
        }
      }));
      return;
    }

    this.setState(() => ({
      invalid: {
        name: false,
        surname: false
      }
    }));

    auth.update(data, () => {
      this.props.history.push('/');
    });
  }

  render() {
    if (!state.user.authenticated) {
      return <Redirect to="/login"/>
    }
    
    return [
      <Row>
        <h1>Edit Profile</h1>
      </Row>,
      <hr/>,
      <Row>
        <Col md="8" lg="5">
          <Form>
            <FormGroup>
              <Label className="m-0" for="inputName" >Name</Label>
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
                <Label className="m-0" for="inputSurname" >Surname</Label>
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
                <Label className="m-0" for="inputLogin" >New Login</Label>
                <Input
                  onChange={this.handleChange}
                  className="m-2"
                  type="text"
                  id="inputLogin"
                  name="login"
                  placeholder="New Login"
                  value={this.state.login}/>
            </FormGroup>
            <FormGroup>
                <Label className="m-0" for="inputPassword" >New Password</Label>
                <Input
                  onChange={this.handleChange}
                  className="m-2"
                  type="password"
                  id="inputPassword"
                  name="password"
                  placeholder="New Password"
                  value={this.state.password}/>
            </FormGroup>
            <Button onClick={this.handleSubmit} color="primary" className="mt-5" >Update</Button>
          </Form>
        </Col>
      </Row>,
    ];
  }
}