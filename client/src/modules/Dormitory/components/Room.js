import React from 'react';

export default ({ onClick, id, name, data, ...rest }) => {
  const getColor = (count) => {
    let colors = {
      0: '#28B463',
      1: '#F7DC6F',
      2: '#F8C471',
      3: '#D35400',
      4: '#E74C3C'
    };

    return colors[count];
  };
  let fill = data.type !== 'R' ? 'none' : getColor(data.tenants.length);

  switch (name) {
    case 'rect':
      return <rect onClick={() => onClick(id)} {...rest} fill={fill} />

    case 'polygon':
      return <polygon onClick={() => onClick(id)} {...rest} fill={fill}/>;

    case 'path':
      return <path onClick={() => onClick(id)} {...rest} fill={fill} />;

    default:
      return null;
  }
}
