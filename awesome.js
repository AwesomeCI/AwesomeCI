'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require("fs");
var orm = require("orm");
var _ = require("lodash");

var app = express();
var config = JSON.parse(fs.readFileSync("./awesome.json"));
config.plugins = _.uniq(config.plugins);


app.enable('trust proxy');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var activePlugins = [];


for (var pluginIndex in config.plugins) {
    var pluginName = config.plugins[pluginIndex];
    console.log("Initializing Plugin: "+pluginName);
    
    //Initialize plugin
    var PluginClass = require(pluginName);
    var plugin = new PluginClass();
    activePlugins.push({
        type : pluginName,
        class : PluginClass,
        instance : plugin
    })
    var pluginSlug = plugin.slug();
    if (typeof pluginSlug === 'string' && pluginSlug.length > 3){
        //Install plugin routes
        var pluginRouter = express.Router();
        plugin.router(pluginRouter);
        app.use("/"+pluginSlug, pluginRouter);
    }else{
        console.log("Unable to install routes for: "+pluginName);
    }
}

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
            req.models.build.find({ job : job.id }).limit(5).order("-id").run(function (err, builds){

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
