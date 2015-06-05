'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require("fs");
var app = express();

app.enable('trust proxy');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// require("./app/routes.js")(app);

var server = app.listen(8000, "0.0.0.0", function (err) {
    if (!err){
        console.log("AwesomeCI Booted");
    }
});

server.on("error", function (err){
    process.exit();
});
