PleeCo
=======

A Web Service to convert Web Pages into PDF files, will be live (soon) at [plee.co](http://plee.co).


## Prerequisites

* [Node.js 0.10+](http://nodejs.org)
* [PhantomJS](http://phantomjs.org/) - tested with 1.9


## Usage

```bash
npm install
npm install -g forever                       # optional
PORT=3000 APIKEY=123 forever app.js          # -or- node app.js
```


## API

Every API call must have an ```apikey``` parameter.<br />
If an API call fails, one of the following HTTP status codes is returned: ```400```, ```401``` or ```500```.


### by page URL


**GET**

    http://<host>/?apikey=<apikey>&url=<http-url>

For example, using *curl*:

```bash
curl http://localhost:3000/?apikey=123&url=http://www.arstechnica.com/
```


### by HTML

**GET** (for small requests)

    http://<host>/?apikey=<apikey>&html=<html-base64-encoded>

---

**POST** (for pages up to 2MB)

    http://<host>/?apikey=<apikey>
    html=<base64-encoded-html>


For example, using *curl*:

```bash
curl -X POST -d "html=PGh0bWw%2BDQo8Ym9keT4NCiA8cD4gSGVsbG8gV29ybGQhIDwvcD4NCjwvYm9keT4NCjwvaHRtbD4%3D" -H "Content-type: application/x-www-form-urlencoded" http://localhost:3000/?apikey=123
```

**Important** The *html* parameter must be converted in **base64** and then urlencoded.




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
