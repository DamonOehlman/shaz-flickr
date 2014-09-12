var s = require('shaz');

require('../')(s, {
  apikey: '1afeba19b3dfd2a8a3671deb8a6fa165'
});

// export some slides
module.exports = [
  s().h1('Hi there').flickr(1383780166)
];
