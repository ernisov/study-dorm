import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form, Input, Select, Icon, Button, message } from 'antd';
import {
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onSubmit,
  clearState
} from './redux/actions';
import './RequestForm.css';
import { allowedRoles } from '../../hoc/allowedRoles';

const { Option } = Select;

class RequestForm extends Component {
  componentDidUpdate() {
    if (this.props.succeded === true) {
      message.success('request created');
      this.props.history.goBack();
    }

    if (this.props.succeded === false && this.props.message) {
      message.error(this.props.message);
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    let { titleInvalid, descriptionInvalid } = this.props;
    let message = 'input is requiered';
    const formItemLayout = {
      layout: 'vertical',
      wrapperCol: {
        sm: { span: 16 },
        md: { span: 10 }
      }
    };

    return (
      <div className='RequestForm'>
        <h3>Request Form</h3>
        <Form {...formItemLayout} onSubmit={this.props.onSubmit}>
          <Form.Item
            validateStatus={titleInvalid ? 'error': ''}
            help={titleInvalid ? message : ''}
            label='Title'
            required
          >
            <Input
              placeholder='title'
              value={this.props.title}
              onChange={this.props.onTitleChange}
              allowClear
            />
          </Form.Item>
          <Form.Item label='Category' required>
            <Select
              value={this.props.category}
              placeholder='Request Category'
              onChange={this.props.onCategoryChange}
            >
              <Option value='plumbing'>Plubming</Option>
              <Option value='carpentry'>Carpentry</Option>
              <Option value='electricity'>Electricity</Option>
              <Option value='other'>Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            validateStatus={descriptionInvalid ? 'error': ''}
            help={descriptionInvalid ? message : ''}
            label='Description'
            required
          >
            <Input.TextArea
              rows={4}
              placeholder='description'
              onChange={this.props.onDescriptionChange}
              value={this.props.description}
            />
          </Form.Item>
          <Button
            htmlType='submit'
            type='primary'
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.requestForm.title,
  description: state.requestForm.description,
  category: state.requestForm.category,
  titleInvalid: state.requestForm.titleInvalid,
  descriptionInvalid: state.requestForm.descriptionInvalid,
  message: state.requestForm.message,
  succeded: state.requestForm.succeded
});

export default allowedRoles(['student', 'employee', 'commandant'])(connect(mapStateToProps, {
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onSubmit,
  clearState
})(withRouter(RequestForm)));
