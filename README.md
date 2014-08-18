rest-test
=========

Node Server for Testing Rest Clients or Mocking Servers
Listens on 3001

Requires Nodejs http://nodejs.org


Installing

1. clone rest-test > git clone https://github.com/bdunford/rest-test.git

2. go to rest-test > cd rest-test

3. Install node modules > npm install

3. Start rest test > node server


Usage
Use for Testing rest clients.  

Make a request to any path and rest test will log to the console information about that request and return a typical response.  rest-test will display, the path,  headers, querystring and body.  When posting the posted object will be returned.

all requests made to /test-a-status/:status with reture the given status example:  http://127.0.0.1:3001/test-a-status/500 will respond with a 500 error. I found this very useful when testing rest clients

example.sh contains several curl requests to rest-test.  to use > sudo chmod +x example.sh  then > ./example.sh
