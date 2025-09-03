// src/api/blog/routes/index.js
'use strict';

const customRoutes = require('./custom');

module.exports = {
  routes: [
    // default routes like find, findOne, etc
    ...customRoutes.routes,
  ],
};
