PleeCo
=======

A Web Service to convert Web Pages into PDF files.


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

    http://<host>/?apikey=<apikey>&url=<http-url>&filename=<file-name>

For example, using *curl*:

```bash
curl http://localhost:3000/?apikey=123&url=http://www.arstechnica.com/&filename=ars
```
Note that filename is optional

### by HTML

**GET** (for small requests)

    http://<host>/?apikey=<apikey>&html=<html-base64-encoded>&filename=<file-name>

---

**POST** (for pages up to 2MB)

    http://<host>/?apikey=<apikey>&filename=<file-name>
    html=<base64-encoded-html>


For example, using *curl*:

```bash
curl -X POST -d "html=PGh0bWw%2BDQo8Ym9keT4NCiA8cD4gSGVsbG8gV29ybGQhIDwvcD4NCjwvYm9keT4NCjwvaHRtbD4%3D" -H "Content-type: application/x-www-form-urlencoded" http://localhost:3000/?apikey=123&filename=test
```

**Important** The *html* parameter must be converted in **base64** and then urlencoded.




## License ##

Plee.co - A Web Service to convert Web Pages into PDF files.
Copyright (c) 2013 Mauro Bolis <mauro@plasticpanda.com>, Simone Lusenti <simone@plasticpanda.com>, Plastic Panda

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
