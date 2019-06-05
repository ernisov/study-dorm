import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { List, Radio, Button } from 'antd';
import './Requests.css';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Requests extends Component  {
  render() {
    return (
      <div className='Requests'>
        <div className='Requests-header'>
          <h3>Requests</h3>
          <RadioGroup>
            <RadioButton>Awaiting</RadioButton>
            <RadioButton>In Progress</RadioButton>
            <RadioButton>Done</RadioButton>
          </RadioGroup>
          <Button
            type='primary'
            onClick={() => this.props.history.push('/requests/create')}
          >
            Create
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {

})(withRouter(Requests));
