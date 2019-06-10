import React, {Fragment} from "react";
import {Col, Row} from "reactstrap";
import errors from "../../API/errors";
import BaseInfo from "./BaseInfo";
import ErrorHistory from "./ErrorHistory";
import ChangeState from "./ChangeState";
import {state} from "../../index";

export default class ShowError extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      visibleChangeState: true
    };
    
    this.handleChangeState = this.handleChangeState.bind(this);
  }
  
  componentDidMount() {
    errors.get(this.props.match.params.id, (error) => {
      console.log(error);
      this.setState(() => ({
        error, 
        visibleChangeState: error.state < errors.state.length - 1
      }));
    })
  }
  
  handleChangeState(historyItem) {
    const error = this.state.error;
    console.log(error);
    error.history.push(historyItem);
    error.state = error.history[error.history.length-1].action;
    this.setState(() => ({
      error,
      visibleChangeState: error.state < errors.state.length - 1
    }));
  }

  render() {
    return (
      <Fragment>
        <Row>
          <h1>Error Info</h1>
        </Row>
        <hr/>
          {this.state.error &&
            <Fragment>
              <Row>
                <Col lg='4'>
                  <BaseInfo error={this.state.error}/>
                </Col>
                <Col lg='8' xs='12' className='mt-5 mt-lg-0'>
                  <ErrorHistory history={this.state.error.history}/>
                </Col>
              </Row>
              {state.user.authenticated && this.state.visibleChangeState &&
                  <ChangeState onChanged={this.handleChangeState} error={this.state.error}/>
              }
            </Fragment>
          }
      </Fragment>
    );
  }
}