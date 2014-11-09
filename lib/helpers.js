var crypto = require('crypto');


//METHODS TO SUPPORT THE HELPERS
var hash = function(obj) {
    var h = crypto.createHash('sha1');
    h.update(JSON.stringify(obj));
    return h.digest('base64');
};

//OBJECT HELPERS
Object.defineProperty( Object.prototype, "merge", {
   value: function(obj) {
       for (var p in obj) {
           this[p] = obj[p];
       }
       return this;
   },
   writable: true,
   enumerable: false,
   configurable: true
});

Object.defineProperty( Object.prototype, "isEqualTo", {
   value: function(obj) {
        return (hash(this) == hash(obj));
   },
   writable: true,
   enumerable: false,
   configurable: true
});

//ARRAY HELPERS
Object.defineProperty(Array.prototype, "pushUnique", {
    value: function(item) {
        var doIt = true;
        this.forEach(function(r){
            if (hash(item) == hash(r)) {
                doIt = false;
            }
        });

        if (doIt) {
            this.push(item);
        }
    },
    writable: true,
    enumerable: false,
    configurable: true
});

Object.defineProperty(Array.prototype, "group_by", {
    value: function(groupBy) {
        var results = {};
        this.forEach(function(r){
            if (r[groupBy]) {
                if(results[r[groupBy]]) {
                    results[r[groupBy]].push(r)
                } else {
                    results[r[groupBy]] = [r];
                }
            }
        });
        return results;
    },
    writable: true,
    enumerable: false,
    configurable: true
});

Object.defineProperty(Array.prototype, "where", {
    value: function(condition) {
        var results = [];
        this.forEach(function(r){
            if (condition(r)) {
                results.push(r);
            }
        });

        return results;
    },
    writable: true,
    enumerable: false,
    configurable: true
});

Object.defineProperty(Array.prototype, "first", {
    value: function(default_value) {
        if (this.length >= 1) {
            return this[0];
        }
        return default_value || null;
    },
    writable: true,
    enumerable: false,
    configurable: true
});

//STRING HELPERS

Object.defineProperty(String.prototype, "tryJsonParse", {
    value: function(returnException) {
        try {
            return JSON.parse(this);
        } catch (e) {
            return returnException && e || null;
        }
    },
    writable: true,
    enumerable: false,
    configurable: true
});

Object.defineProperty(String.prototype, "capitalize", {
    value: function() {
        if (this.length > 0) {
            return this.slice(0,1).toUpperCase() + this.substring(1).toLowerCase();
        }
        return this;
    },
    writable: true,
    enumerable: false,
    configurable: true
});
