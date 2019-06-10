import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Login from "./components/Login";
import Register from "./components/Register";
import EditProfile from "./components/EditProfile";
import Users from "./components/Users";
import ErrorList from "./components/ErrorList";
import {Redirect} from "react-router-dom";

export default class App extends Component {
  static displayName = App.name;
  
  constructor(props) {
      super(props);

      this.handleErrorList = this.handleErrorList.bind(this);
  }
  
  handleErrorList(callback) {
    if (this.props.user.authenticated) {
      this.setState((prevState) => ({additionalNavMenu: prevState.additionalNavMenu == null ? callback : null}))
    }
  }

  render () {
    return (
      <Layout>
        <Redirect to='/errors'/>
        <Route exact path='/errors' render={(props) => <ErrorList {...props} />} />
        <Route path='/users' component={Users} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/edit-profile' render={(props) => <EditProfile {...props} user={this.props.user}/>}  />
      </Layout>
    );
  }
}
