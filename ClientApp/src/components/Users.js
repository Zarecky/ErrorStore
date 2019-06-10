import React from "react";
import {Row, Table} from "reactstrap";
import users from "../API/users";

export default class Users extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      users: null
    }
  }
  
  componentDidMount() {
    users.get((users) => {
      this.setState(() => ({users}));
    })
  }

  render() {
    return [
      <Row>
        <h1>Users</h1>
      </Row>,
      <Row>
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Surname</th>
          </tr>
          </thead>
          <tbody>
          {this.state.users ? this.state.users.map(user => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.surname}</td>
              </tr>
            ))
            : null
          }
          </tbody>
        </Table>
      </Row>
    ];
  }
}