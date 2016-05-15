# react
This is a single resource CRUD client app using the React framework and backed by Mongo for data persistence. Tests for all routes are included.

## Running

### Install packages

```bash
> npm install
```

### Install gulp

```bash
> npm install --save-dev gulp
```

### Build assets

```bash
> gulp
```

### Start mongodb

```bash
> mongod --dbpath=./db
```

### Run server
Open a second terminal instance.
```bash
> node server
```
Note which port it says the server is running on.

### CHECK IT OUT
In browser:
```
open http://localhost:5000
```
5000 is the default for this project, but use the port identified in the Node instance.


####Technologies:

  - React: Client-side framework (including React-router and React-dom) https://github.com/reactjs/react-tutorial
  - Gulp: Task runner
  - Webpack: Module bundler (plus Webpack-stream to run Webpack as a stream to conveniently integrate with Gulp)
  - Express: Server package  
  - Babel: Javascript compiler (including Babel-loader to transpile JS files using Babel and Webpack, and Babel-preset-react to transform JSX into createElement calls)
  - Mongoose: MongoDB object modeling tool designed to work in an asynchronous environment


####Dev Team:

    Kris Skelton
    Gene Troy
