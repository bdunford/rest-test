var express = require('express');
var restTest = require('./lib/resttest.js');
var logger = require('./lib/logger.js');

var app = express();

app.set('port', (process.env.PORT || 3001));

app.use(express.static(__dirname + '/public'));

app.use(restTest.parser('json'));
app.use(function(req,res,next){
    logger.info(req,"rest-test");
    next();
});

app.all('/status/:status*', function(req, res){
    restTest.sendStatus(res,req.params.status);
});

app.all('/redirect',function(req,res) {
    res.redirect('/cusomters/');
});

app.all('/*',function(req,res) {
    restTest.handle(req,res);
});


app.listen(app.get('port'), function() {
  console.log("Listening on port " + app.get('port') + "...");
});
