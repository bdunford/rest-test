#!/bin/bash
ins="-----------------------------------------------------------------------------------------------"
echo $ins
curl -X POST "http://127.0.0.1:3001/customer/"  -H "Content-Type: application/json" -d @test.json -v
echo ""
echo $ins
curl -X GET "http://127.0.0.1:3001/customers/1"  -H "Content-Type: application/json" -v
echo ""
echo $ins
curl -X PUT "http://127.0.0.1:3001/customer/1"  -H "Content-Type: application/json" -d @test.json -v
echo ""
echo $ins
curl -X DELETE "http://127.0.0.1:3001/customer/1"  -H "Content-Type: application/json" -v
echo ""
echo $ins
curl -X GET "http://127.0.0.1:3001/test-a-status/200"  -H "Content-Type: application/json" -v
echo ""
echo $ins
curl -X GET "http://127.0.0.1:3001/test-a-status/204"  -H "Content-Type: application/json" -v
echo ""
echo $ins
curl -X GET "http://127.0.0.1:3001/test-a-status/401"  -H "Content-Type: application/json" -v
echo ""
echo $ins
curl -X GET "http://127.0.0.1:3001/test-a-status/403"  -H "Content-Type: application/json" -v
echo ""
echo $ins
curl -X GET "http://127.0.0.1:3001/test-a-status/404"  -H "Content-Type: application/json" -v
echo ""
echo $ins
curl -X GET "http://127.0.0.1:3001/test-a-status/500"  -H "Content-Type: application/json" -v
