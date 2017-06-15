var express = require('express');
var path = require('path');
var app = express();

var PORT = process.env.PORT || 3000;

//app.use(express.static(__dirname + '/src'));
app.use(express.static(path.join(__dirname, 'docs')));

app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'docs/index.html'));
});

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
