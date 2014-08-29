var fs = require("fs");

function RestTest(req) {
    this.req = req
}

RestTest.prototype.processRequest = function() {
    switch(this.req.method) {
        case 'GET':
            return this.tryFixtureData(this.req);
        case 'POST':
            return this.respondWithId(this.req.body);
        case 'PUT':
            return this.req.body;
        case 'DELETE':
            return {}
        default:
            return {}
    }
}

RestTest.prototype.tryFixtureData = function() {
    var params = this.parsePathToFile(this.req.path);
    var fileData = this.tryFind(this.loadFixtureData(params.file),params.id);
    return (fileData) ? fileData : {
        "path" : this.req.path,
        "headers" : this.req.headers,
        "requestQuery" : this.req.query,
        "requestBody" : this.req.body,
        "message" : "No Fixture Data Found matching Path"
    };
}

RestTest.prototype.parsePathToFile = function(path) {
    var path = path.substring(1).split('/');
    var last = path.pop();

    if (isNaN(last)) {
        path.push(last);
    }

    return {
        file : 'fixtures/' + path.join('-') + '.json',
        id : (isNaN(last)) ? null : last
    }
}


RestTest.prototype.loadFixtureData = function(file) {
    if (fs.existsSync(file)) {
        var data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    }
    return null;
}


RestTest.prototype.tryFind = function(data, id) {
    if (id && data) {
        var found = null;
        data.forEach(function(r){
            if (r["id"] == id) {
                found = r;
            }
        });
        return found;
    } else {
        return data;
    }
}

RestTest.prototype.respondWithId = function() {
    var o = this.req.body;
    o["id"] = 999;
    return o;
}

module.exports = RestTest;
