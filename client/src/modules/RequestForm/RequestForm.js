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
import i18next from '../../i18n/i18n';

const { Option } = Select;

class RequestForm extends Component {
  componentDidUpdate() {
    if (this.props.succeded === true) {
      message.success(i18next.t('requestForm.success'));
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
        <h3>{i18next.t('requestForm.title')}</h3>
        <Form {...formItemLayout} onSubmit={this.props.onSubmit}>
          <Form.Item
            validateStatus={titleInvalid ? 'error': ''}
            help={titleInvalid ? message : ''}
            label={i18next.t('requestForm.requestTitle')}
            required
          >
            <Input
              placeholder={i18next.t('requestForm.requestTitle')}
              value={this.props.title}
              onChange={this.props.onTitleChange}
              allowClear
            />
          </Form.Item>
          <Form.Item label={i18next.t('requestForm.category')} required>
            <Select
              value={this.props.category}
              placeholder={i18next.t('requestForm.category')}
              onChange={this.props.onCategoryChange}
            >
              <Option value='plumbing'>{i18next.t('requests.request.categories.plumbing')}</Option>
              <Option value='carpentry'>{i18next.t('requests.request.categories.carpentry')}</Option>
              <Option value='electricity'>{i18next.t('requests.request.categories.electricity')}</Option>
              <Option value='other'>{i18next.t('requests.request.categories.other')}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            validateStatus={descriptionInvalid ? 'error': ''}
            help={descriptionInvalid ? message : ''}
            label={i18next.t('requestForm.description')}
            required
          >
            <Input.TextArea
              rows={4}
              placeholder={i18next.t('requestForm.description')}
              onChange={this.props.onDescriptionChange}
              value={this.props.description}
            />
          </Form.Item>
          <Button
            htmlType='submit'
            type='primary'
          >
            {i18next.t('requestForm.submit')}
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
