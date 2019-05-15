import React, { Component } from 'react';
import { connect } from 'react-redux';


export const allowedRoles = (roles) => {
  return (WrappedComponent) => {
    class WithAuthorization extends Component {
      render() {
        if (!roles.includes(this.props.role)) {
          return <h3>403 Forbidden</h3>;
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
