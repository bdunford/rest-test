var xml2js = require('xml2js')

function xml() {

    this.parse = function(value, stripRoots) {
        stripRoots = stripRoots || false
        var parser = new xml2js.Parser({explicitRoot: !stripRoots, explicitArray: false});
        var results = {};
        parser.parseString(value,function(err,r){
            if (err) {
                throw err;
            } else {
                results = r;
            }
        });
        return (stripRoots) ? _stripXmlBloat(results) : results;
    };

    this.stringify = function(value, root, child) {
        var writer = new xml2js.Builder({explicitRoot: false});
        value = root && _addxmlBloat(value, root, child) || value;
        return writer.buildObject(value);
    };

    this.child = function(root) {
        return _singular(root);
    };

    var _stripXmlBloat = function(value) {

        var cnt = 0;
        var root = null;
        var isVal = false;

        for (var p in value) {
            root = p;
            isVal = !(typeof value[p] == "object") && !Array.isArray(value[p]);
            cnt++
        }

        if (root && cnt ==1 && !isVal) {
            return (Array.isArray(value[p])) ? value[root] : [value[root]];
        }

        return value;
    }

    var _addxmlBloat = function(value, root, child) {
        if (root) {
            var result = {};

            if (Array.isArray(value)) {
                var records = {};
                child = child || _singular(root);
                records[child] = value;
                result[root] = records;
            } else {
                result[root] = value;
            }

            return result
        }
        return value;
    }

    var _singular = function(value) {
        if (value && value != "") {
            if (value.slice(-1) == "s") {
                return value.slice(0,-1);
            }

            return value + "Record";
        }

        return value;
    };


}

exports = module.exports = new xml();
