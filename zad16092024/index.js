var http = require('http');
const fs = require("node:fs");
const mimeType = require("mime-types");

var json = fs.readFileSync(__dirname + '/data.json');

var html1 = '<h1>Tutaj jest html</h1>'

var html2 = fs.readFileSync(__dirname + '/index.html');

const url = require("url")

var server = http.createServer(function (req, res) {

    var params = url.parse(req.url, true).query;
    const path = req.url


    if(path === "/json") {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(json);
        res.end()
    }
    else if(path === "/html") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html1);
        res.end()
    }
    else if(path === "/html2") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html2);
        res.end()
    }
    else if(path === "/"){
        res.write("Strona Glowna")
        res.end()
    }
    else if(path.startsWith("/get_params")) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        console.log(params.x);
        var content = JSON.stringify(params)
        fs.writeFile(
            "params_"+Date.now()+".json",
            content , err => {
                if(err){
                    console.error(err)
                }
            }
        )
        res.end(content);
    }
    else{
        var pathName = path.replace("/","")
        var files = fs.readdirSync("./assets")
        var found = false;
        for (const file of files){
            if(pathName === file){
                var mime = mimeType.lookup(pathName)
                res.writeHead(200,{"Content-Type": mime});
                var downloadedFile = fs.readFileSync("./assets/" + file)
                res.end(downloadedFile);
                found = true;
            }
        }

        res.writeHead(200,{"Content-Type": "application/json"});
        res.end(fs.readFileSync("./assets/404.json"));
    }
})

server.listen(8000);