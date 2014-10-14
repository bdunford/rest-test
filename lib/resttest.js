var fs = require("fs");
var fixtures = require('./fixtures');
var bodyParser = require('body-parser');
var xml = require('./xml')
var qs = require('querystring');
var codes = require('http').STATUS_CODES;

function RestTest() {

    this.parser = function(default_format) {

        return function(request, response, next) {
            var args = _parseRequestArgs(request, default_format || 'json');
            var content = _negotiateContent(request, args);
            request.rt = {};
            request.rt.args = args;
            request.rt.negotiated = content;
            content.parser(request,response,next);
        };
    };

    this.logger = function (request, response, next) {
        var log = { REQUEST: {
            method: request.method,
            path: request.path,
            headers: request.headers,
            queryString: request.query,
            body: request.body
        }}
        console.log("-----------------------------------");
        console.log(log);
        next();
    };


    this.sendStatus = function(response,status) {
        response.status(parseInt(status)).send(codes[String(status)]);
    };

    this.handle = function(request, response) {
        _respond(request,response);
    };

    var _negotiateContent = function(request, args, default_format) {

        var content = request.headers["content-type"];
        var types = [
            {
                name: 'json',
                parser: bodyParser.json(),
                type: 'application/json',
                formatter: function(data){return data},
                matches: ['application/json','text/json']
            },
            {
                name: 'xml',
                parser: function(req,res,next) {
                    bodyParser.text({type: content})(req,res,function(){
                        req.body = xml.read(req.body);
                        next();
                    });
                },
                type: 'application/xml',
                formatter: function(data){return xml.write(data, args.noun);},
                matches: ['application/xml','text/xml']
            },
            {
                name: 'urlencoded',
                parser: bodyParser.urlencoded({extended: true}),
                type: 'application/x-www-form-urlencoded',
                formatter: function(data){return (Array.isArray(data)) ? data : qs.stringify(data);}, //if Array just return json.
                matches: ['application/x-www-form-urlencoded','text/x-www-form-urlencoded']
            }
        ]

        var typeReq = {};
        var typeRes = {};
        var typeDefault = {};

        types.forEach(function(t){
            if (t.matches.indexOf(content) > -1) {
                typeReq = t;
            }

            if (t.name == args.format) {
                typeRes = t;
            }

            if (t.name == args.default_format) {
                typeDefault = t;
            }
        });

        return {
            parser: typeReq.parser || typeDefault.parser,
            formatter: typeRes.formatter || typeReq.formatter || typeDefault.formatter,
            respond: typeRes.type || typeReq.type || typeDefault.type
        };

    };



    var _respond = function(request, response) {
        var args = request.rt.args;
        var content = request.rt.negotiated;

        var body = {};

        if (args.store) {
            switch(request.method) {
                case 'GET':
                    body = _get(args);
                    break;
                case 'POST':
                    body = _post(args, request.body);
                    break;
                case 'PUT':
                    body = _put(args, request.body);
                    break;
                case 'DELETE':
                    body = _delete(args);
                    break;
            }
        } else {
            body = _default(request);
        }

        response.setHeader('content-type',content.respond);
        response.send(content.formatter(body));

    };




    var _get = function(args) {
        return args.store.find({id: args.id}) || !args.id && [] || null;
    };

    var _post = function(args, body) {
        return args.store.create(body);
    };

    var _delete = function(args) {
        return args.store.delete(args.id);
    };

    var _put = function(args, body) {
        return args.store.update(args.id, body);
    };

    var _default = function(request) {
        return {
            type: "Default Response",
            reason: "No Fixture/Store Found",
            method: request.method,
            path: request.path,
            requestType: request.headers["content-type"],
            responseType: request.rt.negotiated.respond,
            queryString: request.query,
            pathArgs: _parsePath(request.path),
            requestBody: request.body
        };
    };

    var _parseRequestArgs = function(request, default_format) {

       var pathArgs = _parsePath(request.path);
       var queryArgs = _parseQuery(request.query);

       return {
           store: fixtures.store(pathArgs.key),
           id : pathArgs.id,
           format: pathArgs.format || queryArgs.format,
           default_format: default_format,
           noun: pathArgs.noun
       };
   };

    var _parsePath = function(path) {

        var format = path.match(/\.[^\/]*$/g);

        if (format) {
            path = path.replace(format,"");
            format = format[0].replace('.',"");
        }

        var parts = path.replace(/^\//,'').replace(/\/$/,'').split('/');
        var last = parts.pop();

        if (isNaN(last) && last != "") {
          parts.push(last);
        }

        return {
            key: parts.join('-'),
            id : (isNaN(last)) ? null : last,
            format: format,
            noun: parts[parts.length -1]
        };
    };

    var _parseQuery = function (query) {
        return {
            format: query && query["format"]
        };
    };

}

exports = module.exports = new RestTest();
