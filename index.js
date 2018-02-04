var express = require('express');

// App Setup
var app = express();
var server = app.listen(process.env.PORT || 5000)

// Static Files
app.use(express.static('public'));
