import React from "react";
import {Col, Row} from "reactstrap";
import errors from "../../API/errors";
import {getDate} from "../../index";

export default function BaseInfo(props) {
  return [
    <Row>
      <Col xs='4' className="font-weight-bold">
        Short description
      </Col>
      <Col xs='8'>
        {props.error.shortDescription}
      </Col>
    </Row>,
    <Row>
      <Col xs='4' className="font-weight-bold">
        Description
      </Col>
      <Col xs='8'>
        {props.error.description}
      </Col>
    </Row>,
    <Row>
      <Col xs='4' className="font-weight-bold">
        Create date
      </Col>
      <Col xs='8'>
        {getDate(props.error.createDate)}
      </Col>
    </Row>,
    <Row>
      <Col xs='4' className="font-weight-bold">
        State
      </Col>
      <Col xs='8'>
        {errors.state[props.error.state]}
      </Col>
    </Row>,
    <Row>
      <Col xs='4' className="font-weight-bold">
        Urgency
      </Col>
      <Col xs='8'>
        {errors.urgency[props.error.urgency]}
      </Col>
    </Row>,
    <Row>
    <Col xs='4' className="font-weight-bold">
      Criticality
      </Col>
    <Col xs='8'>
      {errors.criticality[props.error.criticality]}
    </Col>
    </Row>
  ]
}