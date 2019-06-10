import React from "react";
import {Button, Col, Collapse, Form, FormGroup, Input, Label, Row} from "reactstrap";
import errors from "../../API/errors";

export default class ChangeState extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      newState: this.props.error.state + 1,
      comment: '',
      invalid: false
    };

    this.handleClickChangeState = this.handleClickChangeState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  

  handleClickChangeState() {
    if (!this.state.isOpen) {
      this.setState(() => ({isOpen: true}));
      return;
    }

    if (this.state.comment === '') {
      this.setState(() => ({invalid: true}));
      return;
    }

    errors.update({
      errorId: this.props.error.id,
      action: this.state.newState,
      comment: this.state.comment
    }, this.props.onChanged);
    
    this.setState((prevState) => ({
      isOpen: false,
      newState: prevState.newState + 1,
      comment: '',
      invalid: false
    }));
  }

  handleChange(e) {
    const text = e.target.value;
    const field = e.target.name;
    this.setState(() => ({[field]: text}))
  }

  render() {
    return (
      <Row className='mt-3'>
        <Col lg={8}>
          <Form>
            <Collapse isOpen={this.state.isOpen}>
              <FormGroup className="align-items-center" row>
                <Label className="ml-3 text-center" for="inputState" >New state</Label>
                <Col>
                  <Input
                    onChange={this.handleChange}
                    className="m-2"
                    type="select"
                    id="inputState"
                    name="newState"
                    placeholder="State"
                    value={this.state.newState}
                  >
                    {errors.state.map((item, v) => {
                      if (v <= this.props.error.state) {
                        return null;
                      }
                      return <option key={v} value={v}>{item}</option>
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <Input
                onChange={this.handleChange}
                invalid={this.state.invalid}
                type="textarea"
                id="inputComment"
                name="comment"
                placeholder="Comment"
                value={this.state.comment}
              />
            </Collapse>
            <Button className="mt-4" onClick={this.handleClickChangeState} color='primary'>
              Change state
            </Button>
          </Form>
        </Col>
      </Row>       
    );
  }
}