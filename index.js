var express = require('express');

// App Setup
var app = express();
var server = app.listen(3000, () => {
  console.log('Listening on port 3000');
});

// Static Files
app.use(express.static('public'));
