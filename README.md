#rest-test


Node project for testing Rest Clients or Mocking Rest Servers. Ideal for developing and testing single page applications.


Requires Nodejs http://nodejs.org


###Installing

1. Clone rest-test > git clone https://github.com/bdunford/rest-test.git

2. Go to rest-test > cd rest-test

3. Install node modules > npm install

3. Start rest test > node server

4. Open a browser or curl to http://127.0.0.1:3001/

     ```curl -X GET "http://127.0.0.1:3001/customers/"  -H "Content-Type: application/json" -v```

###Usage

- Mocking API/endpoint for Single Page Apps, by adding fixtures containing mock data.

- Testing rest clients, make a request to any path and rest test will log to the console information about that request and return a typical response.  rest-test will display, the path,  headers, querystring and body.  When posting the posted object will be returned.

- all requests made to /status/:status with return the given status ```example: http://127.0.0.1:3001/test-a-status/500``` will respond with a 500 error. I found this very useful when testing rest clients

- ./test/example.sh contains several curl requests to rest-test.  to use > cd test > sudo chmod +x test.sh  then > ./test.sh

###Fixtures

- You can add your own fixtures by adding a correctly formated json or xml file in the fixtures folder.  The name of the file will relate to the path. Path segments are separated by "-".  _example: "/movies/family/"_ would route to fixture movies-family.json or movies-family.xml

- There are three sample fixtures

    ```fixtures/customers.json http://127.0.0.1:3001/customers/```
    ```fixtures/hip-customers.json http://127.0.0.1:3001/hip/customers/```
    ```fixtures/formal-customers.xml http://127.0.0.1:3001/formal/customers/```


- GET, POST, PUT, DELETE are all supported.  POST, PUT and DELETE for now are mocked and do not affect the data. PUT and DELETE expect an id ```example: http://127.0.0.1:3001/customers/1```. GET can also be used with an id to select a single object from a fixture.


###Formats

- json, xml, urlencoded are all accepted formats for the request content.  json and xml can be chosen as the response content type. json is the default

- Ending a path in .json or .xml will set the response content type and format.  ```example: http://127.0.0.1:3001/customers.xml or http://127.0.0.1:3001/customers/2.xml```

- The format can also be set in the query string.  ```example: http://127.0.0.1:3001/customers?format=xml```

- A requests format used to parse a request body is determined by the request headers "content-type"
