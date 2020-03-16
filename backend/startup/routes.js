const express = require('express');
const boards  = require('../routes/boards');
const threads = require('../routes/threads');
const replies = require('../routes/replies');
const user    = require('../routes/user');

module.exports = function(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/api/boards', boards);
  app.use('/api/threads', threads);
  app.use('/api/replies', replies);
  app.use('/api/user', user);

  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
}
