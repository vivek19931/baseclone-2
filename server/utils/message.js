const moment = require('moment');

let generateMessage = (from, text,image,links) => {
  return {
    from,
    text,
    image,
    links,
    createdAt: moment().valueOf()
  };
};

let generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat}, ${lng}`,
    createdAt: moment().valueOf()
  }
}

module.exports = {generateMessage, generateLocationMessage};
