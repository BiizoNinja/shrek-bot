# node-streamify

Streamify helps you easily provide a streaming interface for your code.

[![Build Status](https://secure.travis-ci.org/fent/node-streamify.svg)](http://travis-ci.org/fent/node-streamify)
[![Dependency Status](https://david-dm.org/fent/node-streamify.svg)](https://david-dm.org/fent/node-streamify)
[![codecov](https://codecov.io/gh/fent/node-streamify/branch/master/graph/badge.svg)](https://codecov.io/gh/fent/node-streamify)

# Usage

```js
const streamify = require('streamify');
const request   = require('request');

exports.doSomething = () => {
  let stream = streamify();

  request(url1, (err, res, body) => {
    // Do something with `body`.

    // Once the actual stream you want to return is ready,
    // call `stream.resolve()`.
    stream.resolve(request(url2));
  });

  // Your function can return back a stream!!
  return stream;
}

// Because `doSomething()` returns a stream, it can be piped.
exports.doSomething().pipe(anotherStream);
```


# API
### streamify([options])

Returns an instance of a stream. `options` can be

* `readable` - Defaults to `true`.
* `writable` - Defaults to `true`.

### Stream#resolve(stream)

Must be called only once when the actual stream you are proxying to becomes available after an asynchronous operation.

### Stream#unresolve()

Can be used to unbind a a resolved stream to later call `resolve()` again.

### Stream#addSource(stream)

Add a source readable stream.

### Stream#removeSource()

Remove previously added source stream.

### Stream#addDest(stream)

Add a destination writable stream.

### Stream#removeDest()

Remove a previously added destination stream.


# Install

    npm install streamify


# Tests
Tests are written with [mocha](https://mochajs.org)

```bash
npm test
```
