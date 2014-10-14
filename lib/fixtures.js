var fs = require("fs");
var path = require('path')
var xml = require('./xml')

function Fixtures() {

    this.location = "./fixtures";

    this.stores = function() {

        var stores = {};

        if (fs.existsSync(this.location)) {
            self = this;
            fs.readdirSync(this.location).forEach(function(r){
                var ext = path.extname(r);
                if (ext == '.json' || ext == '.xml') {
                    stores[path.basename(r,ext)] = new Store(path.join(self.location,r));
                }
            });
        }

        return stores;
    };

    this.store = function(name) {
        return this.stores()[name] || null;
    };

}

function Store(file) {

    this.file = file;

    this.find = function(args) {
        var contents = fs.readFileSync(this.file, 'utf8');
        switch (path.extname(this.file)) {
            case '.xml':
                results = xml.read(contents);
                break;
            case '.json':
                results = JSON.parse(contents);
                break;
            default:
                throw "Fixtures: No parser found for file extension"
        }

        if (args.id && Array.isArray(results)) {
            var found = null;
            results.forEach(function(r){
                if (String(r["id"]) == String(args.id)) {
                    found = r;
                }
            });
            return found;
        } else {
            return results;
        }
    };

    this.create = function(value) {
        if (!value["id"]) {
            value["id"] = 9999;
        }

        return value;
    };

    this.update = function(id, value) {
        if (!value["id"] || value["id"] != id) {
            value["id"] = id || 9999;
        }

        return value;
    };

    this.delete = function(id) {
        return true;
    };

}

exports = module.exports = new Fixtures()
