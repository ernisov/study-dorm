import React, { Component } from 'react';

class Dorm extends Component {
  constructor(props) {
    super(props);
    this.renderPaths = this.renderPaths.bind(this);
  }

  renderPaths() {
    return this.props.dorm.map(elem => {
      let fill = 'none';
      switch (elem.name) {
        case 'path':
          return <path fill={fill} stroke='#000' {...elem} key={elem.d.slice(0, 5)} />;

        case 'rect':
          return <rect {...elem} key={`${elem.x}${elem.y}`} fill={fill} stroke='#000' />;

        case 'polygon':
          return <polygon {...elem} key={elem.points.slice(0, 15)} fill={fill} stroke='#000' />;

        case 'line':
          return <line {...elem} key={elem.x1} fill={fill} stroke='#000' />;
      }
    });
  }

  render() {
    return (
      <svg className='svg-root' data-name="Слой 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5047 3012">
        {this.renderPaths()}
        {this.props.children}
      </svg>
    );
  }
}

export default Dorm;
