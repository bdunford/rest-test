var fs = require("fs");
var path = require('path')

function fixtures() {

    this.location = "./fixtures";

    this.stores = function() {

        var stores = {};

        if (fs.existsSync(this.location)) {
            self = this;
            fs.readdirSync(this.location).forEach(function(r){
                var ext = path.extname(r);
                stores[path.basename(r,ext)] = new store(path.join(self.location,r));
            });
        }

        return stores;
    };

    this.store = function(name) {
        return this.stores()[name] || null;
    };

}

function store(file) {

    this.file = file;

    this.all = function() {
        return this.find();
    }

    this.find = function(args) {
        var contents = fs.readFileSync(this.file, 'utf8');
        results = JSON.parse(contents);

        if (args && Array.isArray(results)) {
            var matches = [];
            results.forEach(function(r){
                var match = true;
                for (var p in args) {
                    if (r[p] && String(r[p]) != String(args[p])) {
                        match = false;
                    }
                }
                if (match) {
                    matches.push(r);
                }
            });
            return matches
        } else {
            return results;
        }
    };
}

exports = module.exports = new fixtures()
