Plee.co
======
A simple webservice to create pdf from web pages

### Prerequisites

* [Node.js](http://nodejs.org) 0.10
* [PhantomJS](http://phantomjs.org/) 

Tested with
* [Node.js](http://nodejs.org) 0.10.12
* [PhantomJS](http://phantomjs.org/) 1.9


### Usage
```
npm install
source .env
node app.js
```

### Api
You can grab a page using url using this api
```
http://<host>/byurl?url=<url>&key=<key>
```
For example
```
http://localhost:3000/byurl?url=http://arstechnica.com/&key=test
```

You can also create a pdf passing the html code
```
http://<host>/byhtml?html=<html>&key=<key>
```
For example
```
http://localhost:3000/byhtml?html=PGh0bWw%2BDQo8Ym9keT4NCiA8cD4gSGVsbG8gV29ybGQhIDwvcD4NCjwvYm9keT4NCjwvaHRtbD4%3D&key=test
```
Note that html param must be encoded using base64 format.




## License ##

Copyright (c) 2013 PlasticPanda.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.