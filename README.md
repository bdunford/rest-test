#rest-test


Node project for testing Rest Clients or Mocking Rest Servers. Ideal for testing or mocking single page applications.


Requires Nodejs http://nodejs.org


###Installing

1. Clone rest-test > git clone https://github.com/bdunford/rest-test.git

2. Go to rest-test > cd rest-test

3. Install node modules > npm install

3. Start rest test > node server

4. Open a browser or curl to http://127.0.0.1:3001/

    _curl -X GET "http://127.0.0.1:3001/example/"  -H "Content-Type: application/json" -v_

###Usage
- Use for Testing rest clients.  

- Make a request to any path and rest test will log to the console information about that request and return a typical response.  rest-test will display, the path,  headers, querystring and body.  When posting the posted object will be returned.

- all requests made to /status/:status with return the given status example:  http://127.0.0.1:3001/test-a-status/500 will respond with a 500 error. I found this very useful when testing rest clients

- example.sh contains several curl requests to rest-test.  to use > sudo chmod +x example.sh  then > ./example.sh

###fixtures

- You can add your own fixtures by adding a correctly formated json file in the fixtures folder.  The name of the file will represent the path.

- There are two sample fixtures; example.json and nested-example.json.  GET requests to http://127.0.0.1:3001/exmaple will return the contents of fixtures/example.json and GET requests to http://127.0.0.1:3001/nested/example will return the contents of fixtures/nested-example.json

- Find by id is also implemented. If your fixtures contain an id on each object, requests to /myfixture/1 will return only the object where 1 is the value of the id property.  try it out with http://127.0.0.1:3001/example/1
