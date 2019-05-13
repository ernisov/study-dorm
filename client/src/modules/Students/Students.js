import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { fetchUsers } from './redux/actions';

class Students extends Component {
  componentDidMount() {
    if (this.props.students.length === 0) {
      this.props.fetchUsers();
    }
  }

  render() {
    return (
      <Container>
        <p>Students</p>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  loading: state.students.loading
});

export default connect(mapStateToProps, {
  fetchUsers
})(Students);
