function logger() {

    this.includeBody = true;
    this.application = "node";


    this.info = function(request, name) {
        log(request,"INFO",name || this.application,this.includeBody);
    };

    this.warn = function(request, message, name) {
        log(request,"WARNING",name || this.application,this.includeBody, message);
    };

    var log = function(request, label, name, includeBody, message) {

        var level = {APPLICATION: name};
        var content = [];

        if (message) {
            level["MESSAGE"] = message
        }

        var heading = {
            METHOD: request.method,
            PATH: request.path,
            REMOTE: request.headers['x-forwarded-for'] || request.connection.remoteAddress
        };
        content.push("-------------------------------------------------------------------------");
        content.push(line(label,level,true));
        content.push(line("REQUEST",heading,true));
        content.push(line("HEADERS",request.headers));

        if (request.query && !isEmpty(request.query)) {
            content.push(line("QUERY",request.query));
        }

        if (includeBody && request.body && !isEmpty(request.body)) {
            content.push(line("BODY",request.body));
        }

        console.log(content.join("\n"));
    }

    var isEmpty = function(obj) {
        if (JSON.stringify(obj) == JSON.stringify({})){
            return true;
        }
        return false;
    };

    var line = function(label, content, format) {
        if (format) {
            content = flatten(content);
        } else {
            content = JSON.stringify(content);
        }
        return label + " >>> " + content
    };

    var flatten = function(ol) {
        var entry = []
        for(var p in ol) {
            entry.push(p + ": " + ol[p]);
        }

        return entry.join("  ");
    };
}

exports = module.exports = new logger();
