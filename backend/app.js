const express   = require("express");
const morgan    = require('morgan');

const app = express();


app.use(express.urlencoded());
app.use(express.json());
app.use(morgan("dev"));

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

module.exports = app;
