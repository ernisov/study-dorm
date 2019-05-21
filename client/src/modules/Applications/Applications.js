import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Radio } from 'antd';
import { allowedRoles } from '../../hoc/allowedRoles';
import './Applications.css';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: 'unconsidered'
    };
    this.onConfigChange = this.onConfigChange.bind(this);
  }

  onConfigChange(e) {
    this.setState({ config: e.target.value });
  }

  render() {
    return (
      <div className='Applications'>
        <div className='Applications-header'>
          <h3>Applications: </h3>
          <RadioGroup onChange={this.onConfigChange} value={this.state.config}>
            <RadioButton value='unconsidered'>unconsidered</RadioButton>
            <RadioButton value='approved'>approved</RadioButton>
            <RadioButton value='rejected'>rejected</RadioButton>
          </RadioGroup>
        </div>
      </div>
    )
  }
}

export default allowedRoles(['admin', 'dean'])(Applications);
