var logger = require('../lib/logger');
var sep = '-------------------------------------------------------------------------\n'
var infoLvl = 'INFO >>> APPLICATION: Test\n';
var warnLvl = 'WARNING >>> APPLICATION: Test  MESSAGE: The Warning Message\n';
var log = 'REQUEST >>> METHOD: POST  PATH: /text/  REMOTE: 10.34.178.231\nHEADERS >>> {"user-agent":"curl/7.37.1","host":"127.0.0.1:3001","accept":"*/*","content-type":"application/x-www-form-urlencoded","content-length":"413"}\nBODY >>> {"name":"test","id":"1","info":"some data here"}';

describe("logger", function() {

    var request, result;

    console.log = function(msg) {
        result = msg;
    }

    beforeEach(function() {
        result = null;
        request = {
            method: 'POST',
            path: '/text/',
            headers: {
                'user-agent': 'curl/7.37.1',
                host: '127.0.0.1:3001',
                accept: '*/*',
                'content-type': 'application/x-www-form-urlencoded',
                'content-length': '413'
            },
            query: {},
            body: {
                name: "test",
                id: "1",
                info: "some data here"
            },
            connection: {
                remoteAddress: "10.34.178.231"
            }
        }
    });

    it("info(request, name) should format and log headers, queryString, both, method and path to the console", function() {
        var expected = sep + infoLvl + log;
        logger.info(request,"Test")
        expect(result).toEqual(expected);
    });

    it("warn(request, name, message) should format and log headers, queryString, both, method and path to the console", function() {
        var expected = sep + warnLvl + log;
        logger.warn(request,"The Warning Message", "Test");
        expect(result).toEqual(expected);
    });

});
