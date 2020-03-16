const express = require("express");
const morgan  = require('morgan');
const path    = require('path');
const app     = express();

require('dotenv').config();
app.use(morgan("dev"));
require('./startup/dbConnection')();
require('./startup/routes')(app);

let port;

if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
} else {
  port = 3001;
}

console.log('running on ' + port);

app.listen(port);