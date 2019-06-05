import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RequestForm.css';

class RequestForm extends Component {
  render() {
    return (
      <div className='RequestForm'>
        <h3>Request Form</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.requestForm.title,
  description: state.requestForm.description,
  category: state.requestForm.category
});

export default connect(mapStateToProps)(RequestForm);
