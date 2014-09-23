var express = require('express');
var bodyParser = require('body-parser');
var restTest = require('./resttest.js');


function log(req) {
    console.log("---------------------REQUERST------------------------------");
    console.log(req.method + ": " + req.path);
    console.log("- - - - - - - - - - -Headers- - - - - - - - - - - - - - - -");
    console.log(req.headers);
    console.log("- - - - - - - - - - -Query- - - - - - - - - - - - - - - - -");
    console.log(req.query);
    console.log("- - - - - - - - - - -Body - - - - - - - - - - - - - - - - -");
    console.log(req.body);
    console.log("---------------------END REQUERST--------------------------");
}

function getResponseBody(req) {
    var rt = new restTest(req);
    return rt.processRequest();
}

var app = express();

app.set('port', (process.env.PORT || 3001))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.all('/status/:status*', function(req, res){
    console.log(req.params.status)
    log(req);
    if (!req.params.status || req.params.status == 200) {
        res.send(getResponseBody(req));
    } else {
        res.statusCode = req.params.status
        res.send();
    }
});

app.all('/*',function(req,res) {
    log(req);
    res.send(getResponseBody(req));
});


app.listen(app.get('port'), function() {
  console.log("Listening on port " + app.get('port') + "...");
})
