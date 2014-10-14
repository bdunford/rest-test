var xml2js = require('xml2js')

function Xml(options) {

    this.options = options;


    this.read = function(xml) {
        var _parser = new xml2js.Parser({explicitRoot: false, explicitArray: false});
        var results = {};
        _parser.parseString(xml,function(err,r){
            if (err) {
                throw err;
            } else {
                results = r;
            }
        });

        return _stripXmlBloat(results);
    };

    this.write = function(obj,root) {
        root = _capitalize(root);
        var child = _singular(root);
        var _writer = new xml2js.Builder({explicitRoot: false});
        return _writer.buildObject(_addxmlBloat(obj,child,root));
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

    var _addxmlBloat = function(value, child, root) {
        var bloated = {};
        bloated[child] = value;
        if (Array.isArray(value)) {
            var collection = {}
            collection[root] = bloated;
            return collection
        } else {
            return bloated;
        }
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

    var _capitalize = function(value) {
        if (value && value != "") {
            return value.slice(0,1).toUpperCase() + value.substring(1).toLowerCase();
        }
        return value;
    }
}

exports = module.exports = new Xml();
