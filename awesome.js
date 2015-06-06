'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require("fs");
var config = JSON.parse(fs.readFileSync("./awesome.json"));
var app = express();
var orm = require("orm");

app.enable('trust proxy');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(orm.express(config.db.connection, {
    define: function (db, models, next) {
        db.settings.set('instance.cache', false);

        models.jobs = db.define("job", {
            name : String,
            description : String
        });
        models.build = db.define("build", {
            job : Number,
            result : Number
        });


        next();
    }
}));


// require("./app/routes.js")(app);

var server = app.listen(8000, "0.0.0.0", function (err) {
    if (!err){
        console.log("AwesomeCI Booted");
    }
});

app.get("/", function (req, res){
    res.sendFile(__dirname + "/public/theme/"+config.theme+"/layout/layout.html");
});

app.get("/jobs", function (req, res){
    req.models.jobs.all(function (err, jobs){
        if (err){
            console.log(err);
        }
        res.json({
            jobs : jobs
        });
    });
});

app.get("/job/:jobName", function (req, res){
    req.models.jobs.find({ name : req.params.jobName}, function (err, jobs){
        if (err){
            console.log(err);
        }
        if (jobs.length > 0){
            var job = jobs[0];
            req.models.build.find({ job : job.id }).limit(5).run(function (err, builds){

                res.json({
                    error : false,
                    job : job,
                    builds : builds
                });
            });
        }else{
            res.json({
                error : true
            });
        }
    });
});

server.on("error", function (err){
    process.exit();
});
