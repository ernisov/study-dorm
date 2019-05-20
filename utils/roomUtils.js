const svgson = require('svgson');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const parseRoomsFromSVG = (svg, d, f) => {
  return svgson.parse(svg).then((json) => {
    let result = {};
    let dorm = json.children
      .filter(node => !['title', 'defs'].includes(node.name))
      .map(node => {
        let name = node.name;
        delete node.attributes.class;
        return { name, ...node.attributes };
      });

    let rooms = dorm.filter(node => _.isString(node.id));
    roomDescriptions = rooms.map(room => {
      let { id } = room;
      let description = {};
      description.dormitory = id[1];
      description.floor = id[3];
      if (id.includes('WC')) {
        description.type = 'WC';
        description.number = id.slice(6);
      } else {
        description.type = id[4];
        description.number = id.slice(5);
      }
      return { id, ...description };
    });

    dorm = dorm.filter(node => !_.isString(node.id));
    result.dorm = dorm;
    result.rooms = rooms;
    result.roomDescriptions = roomDescriptions;
    // let saving = JSON.stringify({dorm, rooms});
    // fs.writeFileSync(path.resolve(`./data/D${d}F${f}.json`), saving);
    return result;
  });
};

module.exports = {
  parseRoomsFromSVG
};
