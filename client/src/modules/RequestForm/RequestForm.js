import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Icon, Button, message } from 'antd';
import {
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onSubmit
} from './redux/actions';
import './RequestForm.css';

const { Option } = Select;

class RequestForm extends Component {
  componentDidUpdate() {
    if (this.props.succeded === true) {
      message.success('request created');
    }

    if (this.props.succeded === false && this.props.message) {
      message.error(this.props.message);
    }
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
          >
            <Input
              placeholder='title'
              value={this.props.title}
              onChange={this.props.onTitleChange}
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Select
              value={this.props.category}
              placeholder='Request Category'
              onChange={this.props.onCategoryChange}
            >
              <Option value='plumbing'>Plubming</Option>
              <Option value='carptentry'>Carpentry</Option>
              <Option value='electricity'>Electricity</Option>
              <Option value='other'>Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            validateStatus={descriptionInvalid ? 'error': ''}
            help={descriptionInvalid ? message : ''}
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
  error: state.requestForm.error,
  succeded: state.requestForm.succeded
});

export default connect(mapStateToProps, {
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onSubmit
})(RequestForm);
