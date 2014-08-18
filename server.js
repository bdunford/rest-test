var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());



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
};

function getResponseBody(req) {
    switch(req.method) {
        case 'GET':
            return {
                "path" : req.path,
                "headers" : req.headers,
                "requestQuery" : req.query,
                "requestBody" : req.body
            };
        case 'POST':
            return req.body;
        case 'PUT':
            return req.body;
        case 'DELETE':
            return {}
        default:
            return {}
    }
}

app.listen(3001);

app.all('/test-a-status/:status*', function(req, res){
    log(req);
    if (!req.params.status || req.params.status == 200) {
        res.send(getResponseBody(req));
    } else {
        res.statusCode = req.params.status
        res.send({});
    }
});

app.all('/*',function(req,res) {
    log(req);
    res.send(getResponseBody(req));
});



console.log('Listening on port 3001...');
