# generator-express-basic [![Build Status](https://secure.travis-ci.org/kamilgrymuza/generator-express-basic.png?branch=master)](https://travis-ci.org/kamilgrymuza/generator-express-basic)

[Yeoman](http://yeoman.io) generator which creates a simple ExpressJS
application and lets you decide, support for what tools is included.

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-express-basic from npm, run:

```bash
$ npm install -g generator-express-basic
```

Finally, initiate the generator:

```bash
$ yo express-basic
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

# About this generator

### Why yet another express generator ?

Most other Express JS generators are tailored for a specific case.
They often include template libraries or directories for images... which are useless when
e.g. building an API.
That's why this generator asks you what to include and doesn't make any
assumptions. Reasonable defaults are provided.

As of now it is possible to setup the following tools (all optional):

- Mocha (for testing)
- Istanbul (for measuring code coverage)
- Grunt (for automation)
- Bower (for installing packages not available via npm)

### Mocha support

If you decide to use Mocha for testing you will have mocha installed as a dependency in `node_modules`. You will also get an example test suite in `tests`.
To run this test suite please run: `npm test` in the root directory of your generated app. You should see something like this:

```
> test@0.0.1 test <path_to_your_generated_app>
> mocha


  ․

  1 passing (19ms)
```

### Istanbul support

If you'd like to measure code coverage you can do so by enabling Istanbul. To get the coverage report you'll have to run `npm test --coverage`. This should give you a summary in your terminal, similar to this:

```
=============================== Coverage summary ===============================
Statements   : 100% ( 5/5 )
Branches     : 100% ( 0/0 )
Functions    : 100% ( 1/1 )
Lines        : 100% ( 5/5 )
================================================================================
```

You will also get an HTML report in `coverage` directory. You can open `coverage/lcov-report/index.html` in your browser to inspect coverage issues in detail.

### Grunt

If you decide to use grunt a `Gruntfile.js` will be generated for you. It will have one (and default) task set up which runs your express aplication on `localhost:3000`.

### Bower

If you like, you can use bower to set up packages which are not available in npm. If you choose to use it, a minimal `bower.json` file will be generated for you.

## Running your application

To run you application it is best to install Grunt, after that you can just run `grunt` to have your application listen on `localhost:3000`.




## License (MIT)

Copyright (C) 2014 Kamil Grymuza

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

