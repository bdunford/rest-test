var xml = require("../lib/xml");
function flatten(value) {
    return value.replace(/(\r\n|\n|\r|\s{2,})/gm,"");
}

describe("xml", function() {

    var testObject = {
        customers: {
            customer: [
                {
                    id: "1",
                    name: "tim",
                    size: "L"
                },
                {
                    id: "2",
                    name: "tim",
                    size: "L"
                },
                {
                    id: "3",
                    name: "tim",
                    size: "L"
                },
            ]
        }
    };

    var testXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><customers><customer><id>1</id><name>tim</name><size>L</size></customer><customer><id>2</id><name>tim</name><size>L</size></customer><customer><id>3</id><name>tim</name><size>L</size></customer></customers>';

    var singleXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><customer><id>1</id><name>tim</name><size>L</size></customer>';
    var singleObject = {customer: testObject.customers.customer[0]};

    beforeEach(function() {

    });

    it("should be defined", function() {
        expect(xml).toBeDefined();
    });

    it("parse(value) should parse an xml string to object", function() {
        result = xml.parse(singleXml);
        expect(result).toBeDefined();
        expect(JSON.stringify(result)).toEqual(JSON.stringify(singleObject));
    });

    it("parse(value, stripRoots) should parse an xml string to object and strip the root element", function() {
        result = xml.parse(singleXml, true);
        expect(result).toBeDefined();
        expect(JSON.stringify(result)).toEqual(JSON.stringify(singleObject.customer));
    });

    it("stringify(value) should convert a wrapped object to an XML string", function() {
        result = xml.stringify(singleObject);
        expect(result).toBeDefined();
        expect(flatten(result)).toEqual(singleXml);
    });

    it("stringify(value, root) should convert an object to an XML string and add a root element", function() {
        result = xml.stringify(singleObject.customer, "customer");
        expect(result).toBeDefined();
        expect(flatten(result)).toEqual(singleXml);
    });


    it("parse(value) should parse an xml string to a wrapped array of object", function() {
        result = xml.parse(testXml);
        expect(result).toBeDefined();
        expect(JSON.stringify(result)).toEqual(JSON.stringify(testObject));
    });

    it("parse(value, stripRoots) should parse an xml string to an array of objects and strip root and child-root elements", function() {
        result = xml.parse(testXml, true);
        expect(result).toBeDefined();
        expect(JSON.stringify(result)).toEqual(JSON.stringify(testObject.customers.customer));
    });

    it("stringify(value) should convert a wrapped array of objects to an XML string", function() {
        result = xml.stringify(testObject);
        expect(result).toBeDefined();
        expect(flatten(result)).toEqual(testXml);
    });

    it("stringify(value, root) should convert an array of objects to an XML string and add a root element the childern should have the singular of the root", function() {
        result = xml.stringify(testObject.customers.customer, "customers");
        expect(result).toBeDefined();
        expect(flatten(result)).toEqual(testXml);
    });

    it("stringify(value, root, child) should convert an Array of objects to an XML string adding a root then a child element for each", function() {
        result = xml.stringify(testObject.customers.customer, "customers", "customer");
        expect(result).toBeDefined();
        expect(flatten(result)).toEqual(testXml);
    });

    it("child(root) should return child name that would be used for a given root", function() {
        result = xml.child("customers")
        expect(result).toBeDefined();
        expect(result).toEqual("customer");
    });




});
