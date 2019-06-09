import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


export const allowedRoles = (roles) => {
  return (WrappedComponent) => {
    class WithAuthorization extends Component {
      render() {
        if (!roles.includes(this.props.role)) {
          return <Redirect to='/' />;
        }

        return <WrappedComponent {...this.props} />;
      }
    }

    const mapStateToProps = (state) => ({
      role: state.user.role
    });

    return connect(mapStateToProps)(WithAuthorization);
  };
};
