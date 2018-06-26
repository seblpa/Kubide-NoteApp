const express = require('express');

const app = express();


app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./nota'));
app.use(require('./favorita'));


module.exports = app;