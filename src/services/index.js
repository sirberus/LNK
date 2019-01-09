const links = require('./links/links.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(links);
};
