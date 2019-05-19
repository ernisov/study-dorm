import React, { Component } from 'react';

export default ({ onClick, id, type, ...rest }) => {
  switch (type) {
    case 'rect':
      return <rect onClick={() => onClick(id)} {...rest} />

    case 'polygon':
      return <polygon onClick={() => onClick(id)} {...rest} />;

    case 'path':
      return <path onClick={() => onClick(id)} {...rest} />;

    default:
      return null;
  }
}
