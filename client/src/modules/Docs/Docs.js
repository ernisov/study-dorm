import React, { Component } from 'react';
import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';
import { allowedRoles } from '../../hoc/allowedRoles';

class Docs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      definitionLink: '/docs'
    };
  }

  componentDidMount() {
    SwaggerUI({
      domNode: document.getElementById('api-data'),
      url: this.state.definitionLink
    });
  }

  render() {
    return (
      <div>
        <div id='api-data' />
      </div>
    );
  }
}

export default allowedRoles(['admin'])(Docs);
