import React, { Component } from 'react';
import { Button, Form, Input, Select, message, TextArea } from 'antd';
import { request } from '../../../api/requests';
import { connect } from 'react-redux';
import { updateAnnouncement } from '../redux/actions;'
import './AnnouncementCreate.css';

const { Option } = Select;

class AnnouncementForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }

  componentDidMount() {
    if (this.props.edit) {
      let { title, description } = this.props.announcement;
      this.setState({ title, description });
    }
  }

  handleTitle(e) {
    this.setState({ title: e.target.value, titleInvalid: false });
  }

  handleDescription(e) {
    this.setState({ description: e.target.value, descriptionInvalid: false });
  }

  submitForm(e) {
    e.preventDefault();
    if (!this.state.title) {
      return this.setState({ titleInvalid: true });
    }

    if (!this.state.description) {
      return this.setState({ descriptionInvalid: true });
    }

    let announcement = {
      title: this.state.title,
      description: this.state.description
    };

    let config;

    if (this.props.edit) {
      config = {
        method: 'patch',
        url: `/announcements/${this.props.announcement.id}`
        data: announcement
      };
    } else {
      config = {
        method: 'post',
        url: `/announcements/`
        data: announcement
      };
    }

    request(config).then((response) => {
      if (this.props.edit) {
        this.props.updateAnnouncement(this.props.announcement, response.data);
      }
      message.success(`success.`);
      this.setState({ title: '', password: '' });
    }).catch((err) => {
      console.log(err);
      message.error(`Couldn't perform operation`)
    })
  }

  render() {
    const formItemLayout = {
      layout: 'vertical',
      wrapperCol: {
        sm: { span: 16 },
        md: { span: 10 }
      }
    };

    return (
      <div className="AnnouncementCreate">
        <Form {...formItemLayout} onSubmit={this.submitForm}>
          <section>
            <h3 className='section-header'>Main</h3>
            <Form.Item
              required
              label='Title'
            >
              <Input value={this.state.title} allowClear onChange={this.handleTitle} />
            </Form.Item>
            <Form.Item
              required
              label='Description'
            >
              <TextArea
                value={this.state.description}
                allowClear
                onChange={this.handleDescription}
                placeholder="Enter description of announcement"
                autosize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </section>
        </Form>
        <Button
          onClick={this.submitForm}
          className='announcement-create-submit'
          htmlType='submit'
          type='primary'
        >
          {this.props.edit ? 'Update' : 'Register'}
        </Button>
      </div>
    );
  }
}
