const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000
const connectToMongo = require('./db');
const cors = require('cors')
require('dotenv').config()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
connectToMongo();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use('/auth',require('./routes/auth'));
app.use('/blogs',require('./routes/blogs'));
app.use('/preferences',require('./routes/preferences'));

if (process.env.NODE_ENV = "production"){
  app.use(express.static("blog-app/build"));
  const path = require("path");
  app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'blog-app', 'build', 'index.html'));
  })

app.listen(port,() => {
    console.log(`Server listening at port ${port}`)
});