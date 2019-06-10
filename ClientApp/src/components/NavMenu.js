import React, { Component } from 'react';
import {
  Button,
  Collapse,
  Container, DropdownItem, DropdownMenu, DropdownToggle,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import auth from "../API/auth";
import {Switch, Route} from "react-router";
import {state} from "../index";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.state = {
      collapsed: true
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  
  handleLogout() {
    auth.logout();
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/errors">ErrorTracker</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/users">Users</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/errors">Errors</NavLink>
                </NavItem>
              </ul>
            </Collapse>
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                {state.user.authenticated ?
                <Switch>
                  <Route exact path='/errors' render={(props) => (
                    <div className="mr-3">
                      <Button
                        tag={Link}
                        to="/errors/create"
                        color="primary"
                      >
                        Create New Error
                      </Button>
                    </div>
                  )}/>
                </Switch> : null}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {state.user.authenticated ?
                      `Hello, ${state.user.name} ${state.user.surname}` : `Account`}
                  </DropdownToggle>
                  <DropdownMenu right>
                    {state.user.authenticated ?
                      [
                        <DropdownItem>
                          <NavLink tag={Link} className="text-dark" to="/edit-profile">Edit Profile</NavLink>
                        </DropdownItem>,
                        <DropdownItem>
                          <NavLink onClick={this.handleLogout} tag={Link} className="text-dark" to="/">Logout</NavLink>
                        </DropdownItem>
                      ]
                      :
                      [
                        <DropdownItem>
                          <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                        </DropdownItem>,
                        <DropdownItem>
                          <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                        </DropdownItem>
                      ]}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
