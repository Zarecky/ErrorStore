import React from "react";
import {Table} from "reactstrap";
import errors from "../../API/errors";

export default function ErrorHistory(props) {
    return (
      <Table>
        <thead>
        <tr>
          <th>Data</th>
          <th>Action</th>
          <th>Comment</th>
          <th>User</th>
        </tr>
        </thead>
        <tbody>
        {props.history.map(item => (
          <tr key={item.id}>
            <td>{item.date}</td>
            <td>{errors.history.action[item.action]}</td>
            <td>{item.comment}</td>
            <td>{item.user.name} {item.user.surname}</td>
          </tr>
        )) }
        </tbody>
      </Table>
    );
}