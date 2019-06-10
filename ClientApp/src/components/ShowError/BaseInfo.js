import React from "react";
import {Col, Row} from "reactstrap";
import errors from "../../API/errors";

export default function BaseInfo(props) {
  return [
    <Row>
      <Col xs='4' className="font-weight-bold">
        Short description
      </Col>
      <Col>
        {props.error.shortDescription}
      </Col>
    </Row>,
    <Row>
    <Col xs='4' className="font-weight-bold">
      Description
      </Col>
    <Col>
      {props.error.description}
    </Col>
    </Row>,
    <Row>
      <Col xs='4' className="font-weight-bold">
        Create date
      </Col>
      <Col>
        {props.error.createDate}
      </Col>
    </Row>,
    <Row>
    <Col xs='4' className="font-weight-bold">
      State
      </Col>
    <Col>
      {errors.state[props.error.state]}
    </Col>
    </Row>,
    <Row>
      <Col xs='4' className="font-weight-bold">
        Urgency
      </Col>
      <Col>
        {errors.urgency[props.error.urgency]}
      </Col>
    </Row>,
    <Row>
    <Col xs='4' className="font-weight-bold">
      Criticality
      </Col>
    <Col>
      {errors.criticality[props.error.criticality]}
    </Col>
    </Row>
  ]
}