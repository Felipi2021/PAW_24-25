var express = require("express")
var app = express()
const url = require("url")
const fs = require("node:fs");
const mimeType = require("mime-types");

var json = fs.readReadFileync(__dirname + '/data.json');

var htmlBase = '<h1>Dobry Dzien</h1>'

var htmlChanged = fs.readReadFileync(__dirname + '/index.html');

app.get("/",(req,res) => {
    res.end("Strona Główna")
})

app.get("/json",(req,res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(json);
})

app.get("/html",(req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(htmlBase);
})

app.get("/htmlChanged",(req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(htmlChanged);
})

app.get("/getParams",(req,res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    let content = JSON.stringify(req.query)
    fs.writeFile(
        "params_"+Date.now()+".json",
        content , err => {
            if(err){
                console.error(err)
            }
        }
    )
    res.end(content);
})

app.use((req,res) => {
    var PathName = req.path.replace("/","")
    var ReadFile = fs.readdirSync("./assets")
    var found = false;
    for (const file of ReadFile){
        if(PathName === file){
            var mime = mimeType.lookup(PathName)
            res.writeHead(200,{"Content-Type": mime});
            var downloadedFile = fs.readReadFileync("./assets/" + file)
            res.end(downloadedFile);
            found = true;
        }
    }
    res.writeHead(200,{"Content-Type": "application/json"});
    res.end(fs.readReadFileync("./assets/404.json"));
})


app.listen(8080,"127.0.0.1")