var helpers = require("../lib/helpers");

describe("helpers", function() {

    var objA, objB, objC, arr

    beforeEach(function() {
        objA = {name: "Test", id: 1, shared: "origional"};
        objB = {name: "Test", id: 2, shared: "origional"};
        objC = {name: "Sample", id: 3, shared: "origional"};
        objD = {name: "Sample", id: 4, shared: "origional"};
        objE = {name: "Example", id: 5, shared: "origional"};
        objF = {name: "Example", id: 6, shared: "origional"};

        objX = {fullName: "Testy McTester", id: 1, shared: "updated"};

        arr = [objA,objB,objC,objD,objE,objF];

    });

    it("should be defined", function() {
        expect(helpers).toBeDefined();
    });

    it ("Object.isEqualTo(obj) should compare two like objects as return true", function(){
        objB.id = 1;
        var result = objA.isEqualTo(objB);
        expect(result).toBeTruthy();
    })

    it ("Object.isEqualTo(obj) should compare two unlike objects as return False", function(){
        objB.id = 5;
        var result = objA.isEqualTo(objB);
        expect(result).toBeFalsy();
    })

    it ("Object.merge(obj) merge the properties and values of two objects updating existing properties and adding new", function(){
        var result = objA.merge(objX);
        expect(result.name).toEqual('Test');
        expect(result.shared).toEqual('updated');
        expect(result.fullName).toEqual('Testy McTester');
    })

    it ("Object.merge(obj) merge be passed a null object and preserve the primary", function(){
        var result = objA.merge(null);
        expect(result.name).toEqual('Test');
        expect(result.shared).toEqual('origional');
        expect(result.id).toEqual(1);
    })

    it ("Object.merge(obj) merge to allow empty objects to be merged to", function(){
        var result = {}.merge(objB);
        expect(result.name).toEqual('Test');
        expect(result.shared).toEqual('origional');
        expect(result.id).toEqual(2);
    })

    it ("Array.first() should return the first object of an array", function(){
        var result = arr.first();
        expect(result).toEqual(objA);
    })

    it ("Array.first() should return null if array is empty", function(){
        var result = [].first();
        expect(result).toBe(null);
    })

    it ("Array.first(default_value) should return default_value if array is empty", function(){
        var result = [].first(objA);
        expect(result).toEqual(objA);
    })

    it ("Array.where(condition) should return an array containing the single Item found", function(){
        var result = arr.where(function(v){
            return (v.id == 3);
        });
        expect(result[0]).toEqual(objC);
    })

    it ("Array.where(condition) should return an array containing all Items found ", function(){
        var result = arr.where(function(v){
            return (v.name == "Test");
        });
        expect(result.length).toEqual(2);
    })

    it ("Array.group_by(property) return an array of Arrays grouping the objects", function(){
        var result = arr.group_by("name");
        expect(result.Test[0]).toEqual(objA);
        expect(result.Test[1]).toEqual(objB);
        expect(result.Sample[0]).toEqual(objC);
        expect(result.Sample[1]).toEqual(objD);
        expect(result.Example[0]).toEqual(objE);
        expect(result.Example[1]).toEqual(objF);
    })


    it ("Array.pushUnique(obj) not add an item if it already exists in the array", function(){
        var objNew = {name: "Test", id: 1, shared: "origional"};
        var len = arr.length;
        arr.pushUnique(objNew);
        expect(len).toEqual(arr.length);
    })

    it ("Array.pushUnique(obj) add an item if it does not exists in the array", function(){
        var objNew = {name: "Testing", id: 9, shared: "origional"};
        var len = arr.length;
        arr.pushUnique(objNew);
        expect(len + 1).toEqual(arr.length);
    })

    it ("String.capitalize() Capitalize the first letter of a string", function(){
        expect("tim".capitalize()).toEqual("Tim");
        expect("t".capitalize()).toEqual("T");
        expect("1tim".capitalize()).toEqual("1tim");
    })

    it ("String.tryJsonParse() to parse string as Json to Object", function(){
        var s = '{"name":"Test","id":1,"shared":"origional"}';
        var result = s.tryJsonParse();

        expect(result.name).toEqual("Test");
        expect(result.id).toEqual(1);
        expect(result.shared).toEqual("origional");
    })

    it ("String.tryJsonParse() to return null when json not valid", function(){
        var s = '{"name":"Test"}}}},"id":1,"shared":"origional"}';
        var result = s.tryJsonParse();
        expect(result).toEqual(null);
    })

    it ("String.tryJsonParse(returnException) to return the JSON.parse Exception when json not valid", function(){
        var s = '{"name":"Test"}}}},"id":1,"shared":"origional"}';
        var result = s.tryJsonParse(true);
        expect(result).toBeDefined();
    })

});
