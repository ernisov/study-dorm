import React from 'react';

export default (props) => (
  <rect
    onClick={props.onClick}
    height={props.height}
    width={props.width}
    fill={props.fill}
    x={props.x}
    y={props.y}
  />
);
