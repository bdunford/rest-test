#!/bin/bash
ins="----------------------------------------------"
echo "==================Test Post all content_type to customers==============="
curl -X POST "http://127.0.0.1:3001/customers"  -H "Content-Type: application/json" -H "Accept: */*" -d @test.json
echo
echo $ins
curl -X POST "http://127.0.0.1:3001/customers/"  -H "Content-Type: application/xml" -H "Accept: */*" -d @test.xml
echo
echo $ins
curl -X POST "http://127.0.0.1:3001/customers?nothing=something"  -H "Content-Type: application/x-www-form-urlencoded" -H "Accept: */*" -d @test.form
echo
echo $ins
curl -X POST "http://127.0.0.1:3001/customers.json"  -H "Content-Type: application/x-www-form-urlencoded" -H "Accept: */*" -d @test.form
echo
echo $ins
curl -X POST "http://127.0.0.1:3001/customers.xml"  -H "Content-Type: application/x-www-form-urlencoded" -H "Accept: */*" -d @test.form
echo
echo "==================Test Put all content_types to customers==============="
curl -X PUT "http://127.0.0.1:3001/customers/3"  -H "Content-Type: application/json" -H "Accept: */*" -d @test.json
echo
echo $ins
curl -X PUT "http://127.0.0.1:3001/customers/3/"  -H "Content-Type: application/xml" -H "Accept: */*" -d @test.xml
echo
echo $ins
curl -X PUT "http://127.0.0.1:3001/customers/3?nothing=something"  -H "Content-Type: application/x-www-form-urlencoded" -H "Accept: */*" -d @test.form
echo
echo $ins
curl -X PUT "http://127.0.0.1:3001/customers/3/?format=json"  -H "Content-Type: application/x-www-form-urlencoded" -H "Accept: */*" -d @test.form
echo
echo $ins
curl -X PUT "http://127.0.0.1:3001/customers/3?format=xml"  -H "Content-Type: application/x-www-form-urlencoded" -H "Accept: */*" -d @test.form
echo
echo "==================Test DELETE to customers==============="
curl -X DELETE "http://127.0.0.1:3001/customers/3"
echo
echo "==================Test GET Json content_type to customers==============="
curl -X GET "http://127.0.0.1:3001/customers.json"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers?format=json"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/?format=json"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/1.json"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/2?format=json"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/3/?format=json"
echo
echo "==================Test GET XML content_type to customers ==============="
curl -X GET "http://127.0.0.1:3001/customers.xml"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers?format=xml"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/?format=xml"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/1.xml"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/2?format=xml"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/3/?format=xml"
echo
echo "==================Test GET DEFAULT content_type to customers ==============="
curl -X GET "http://127.0.0.1:3001/customers"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/1"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/2/"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/3/?something=else"
echo
echo "==================Test ALL to Non Fixture backed route==============="
curl -X POST "http://127.0.0.1:3001/nothing/"  -H "Content-Type: application/json" -H "Accept: */*" -d @test.json
echo
echo $ins
curl -X PUT "http://127.0.0.1:3001/nothing/1"  -H "Content-Type: application/json" -H "Accept: */*" -d @test.json
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/nothing/"
echo
echo $ins
curl -X DELETE "http://127.0.0.1:3001/nothing/3"
echo
echo "==================Test STATUS ROUTE==============="
curl -X GET "http://127.0.0.1:3001/status/401"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/status/403"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/status/404"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/status/418"
echo
echo $ins
curl -X GET "http://127.0.0.1:3001/status/500"
echo
