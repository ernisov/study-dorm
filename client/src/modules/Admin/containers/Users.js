import React, { Component } from 'react';
import { request } from '../../../api/requests';
import './Users.css';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      users: []
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    console.log(this.state.page);
    request({
      method: 'get',
      url: '/users/',
      params: {
        page: this.state.page,
        limit: 1
      }
    }).then((response) => {
      console.log(response);
      this.setState({ page: this.state.page + 1, users: [...response.data.users, ...this.state.users] });
    })

  }

  render() {
    return (
      <div className="Users">
        <button onClick={this.loadMore}>load more</button>
        {
          this.state.users.map((user) => <p>{`${user.username} - ${user.role}`}</p>)
        }
      </div>
    );
  }
}

export default Users;
