var fixtures = require("../lib/fixtures");

describe("fixtures", function() {

    beforeEach(function() {
        fixtures.location = './spec/fixtures';
    });

    it("should be defined", function() {
        expect(fixtures).toBeDefined();
    });

    it("stores() should list all stores in the specified fixture location", function(){
        var results = fixtures.stores();
        expect(results["test"]).toBeDefined();
        expect(results["test"].file).toEqual("spec/fixtures/test.json");
        expect(results["second-test"]).toBeDefined();
        expect(results["second-test"].file).toEqual("spec/fixtures/second-test.json");
    });

    it("store(name) should return a single store", function(){
        var result = fixtures.store('test');
        expect(result).toBeDefined();
        expect(result.file).toEqual("spec/fixtures/test.json");
    });

    it("store(name).all() should return all records found in a store", function(){
        var result = fixtures.store('test').all();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(5);
    });

    it("store(name).find(args) should return one record matching args", function(){
        var result = fixtures.store('test').find({id: 5});
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(5);
        expect(result[0].name).toEqual("jon");
    });

    it("store(name).find(args) should return one record matching args", function(){
        var result = fixtures.store('test').find({name: 'jon'});
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(5);
        expect(result[0].name).toEqual("jon");

    });

    it("store(name).find(args) should return multipule records matching args", function(){
        var result = fixtures.store('test').find({size: 'L'});
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(2);
    });

    it("store(name).find(args) should return one record matching multipule args", function(){
        var result = fixtures.store('test').find({id: 5, name: "jon", size: "L"});
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(5);
        expect(result[0].name).toEqual("jon");

    });

    it("store(name).find(args) should ignore args and return contents when array is not present", function(){
        var result = fixtures.store('second-test').find({id:10});
        expect(result).toBeDefined();
        expect(result.id).toEqual(5);
        expect(result.name).toEqual("jon");
    });

});
