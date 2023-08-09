var http = require('http');
var fs = require('fs');
var path = require('path');
const { parse } = require('querystring');
const functions = require("./functions.js");

http.createServer(function (req, res) {

  if(req.url === "/"){

    fs.readFile("index.html", "UTF-8", function(err, data) {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }
  else if(req.url.match("\.css$")){

    var cssPath = path.join(__dirname, '', req.url);
    var fileStream = fs.createReadStream(cssPath,"UTF-8");
    res.writeHead(200,{"Content-Type": "text/css"});
    fileStream.pipe(res);
  }
  else if(req.url.match("\.js$")){

    var jsPath = path.join(__dirname, '', req.url);
    var fileStream = fs.createReadStream(jsPath,"UTF-8");
    res.writeHead(200,{"Content-Type": "text/js"});
    fileStream.pipe(res);
  }
  else{
    res.writeHead(404, {"Content-Type": "text/html"});
    res.end("No Page Found");
  }

  if (req.method === 'POST') {
    let resultData;
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
      var formData = parse(body);
        console.log(
            parse(body)
        );

        if(formData.surname){
          functions.createRecordSubmission(formData);
        }
        else if(formData.id){
          functions.updateRecordSubmission(formData);
        }
        else{
          resultData = functions.switcher(formData);
          // functions.deleteRecordSubmission(formData);
        }

        fs.readFile("index.html", "UTF-8", function(err, data) {
          res.writeHead(200, {"Content-Type": "text/html"});

          // res.write(data);

          var dataPart1 = functions.beforeLast(data, '</body></html>');

          res.write(dataPart1);
          setTimeout(function() {
            res.write('<p>'+resultData+'</p>');
            res.write('</body></html>');
            res.end();
          }, 10000);

        });
    });
  }



}).listen(8080);