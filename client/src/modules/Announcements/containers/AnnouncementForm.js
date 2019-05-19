import React, { Component } from 'react';
import { Button, Form, Input, Select, Icon, Tooltip, message } from 'antd';
import { request } from '../../../api/requests';
import { connect } from 'react-redux';
import { updateAnnouncement } from '../redux/actions;'
import './AnnouncementCreate.js';

const { Option } = Select;

class AnnouncementForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };

  }
}
