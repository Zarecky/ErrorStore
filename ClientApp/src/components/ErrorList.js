import React, {Fragment} from "react";
import {Row, Table} from "reactstrap";
import errors from "../API/errors";
import {withRouter} from "react-router-dom";
import CreateError from "./CreateError";
import {Route, Switch} from "react-router";
import ShowError from "./ShowError/ShowError";
import {getDate} from "../index";

class ErrorList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: null
    };
    
    this.handleCreatedNewError = this.handleCreatedNewError.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    errors.getAll((errors) => {
      this.setState(() => ({errors}));
    });
  }
  
  handleCreatedNewError(newError) {
    const errors = this.state.errors;
    errors.push(newError);
    this.setState(() => ({errors}));
  }
  
  handleClickItem(id) {
    this.props.history.push(`${this.props.match.url}/${id}`);
  }
  
  handleSort(sortedField) {
    console.log(sortedField);
    const errors = this.state.errors;
    errors.sort((a, b) => {
      if (typeof a[sortedField] === 'string'){
        return a[sortedField].localeCompare(b[sortedField]);
      }  
      return a[sortedField] - b[sortedField]
    });
    this.setState(() => ({errors}));
  }

  render() {
    return (
      <Switch>
        <Route path={`${this.props.match.url}/create`} render={(props) => <CreateError {...props} onCreated={this.handleCreatedNewError} /> } />,
        <Route path={`${this.props.match.url}/:id`} render={(props) => <ShowError {...props} /> } />,
        <Route exact path='' render={() => [
          <Row className="mb-2">
            <h1>Error List</h1>
          </Row>,
            <Fragment>
              { this.state.errors && this.state.errors.length > 0 ?
                <Row>
                  <Table hover>
                    <thead>
                    <tr>
                      <th onClick={() => this.handleSort('id')}>#</th>
                      <th onClick={() => this.handleSort('shortDescription')}>Description</th>
                      <th onClick={() => this.handleSort('createDate')}>Create Date</th>
                      <th onClick={() => this.handleSort('state')}>State</th>
                      <th onClick={() => this.handleSort('urgency')}>Urgency</th>
                      <th onClick={() => this.handleSort('criticality')}>Criticality</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.errors.map(error => (
                      <tr onClick={() => this.handleClickItem(error.id)} key={error.id}>
                        <th scope="row">{error.id}</th>
                        <td>{error.shortDescription}</td>
                        <td>{getDate(error.createDate)}</td>
                        <td>{errors.state[error.state]}</td>
                        <td>{errors.urgency[error.urgency]}</td>
                        <td>{errors.criticality[error.criticality]}</td>
                      </tr>
                    )) }
                    </tbody>
                  </Table>
                </Row> : null}
            </Fragment>
        ]}/>
      </Switch>
    );
  }
}

export default withRouter(ErrorList)