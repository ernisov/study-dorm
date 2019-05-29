import React, { Component } from 'react';
import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

class Docs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      definitionLink: '/swagger.yml'
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

export default Docs;
