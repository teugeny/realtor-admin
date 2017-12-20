var express = require('express'),
    http = require('http'),
    app = module.exports = express();

app.get('/', function (req, res) {
    res.sendfile('./dist/index.html')
});

app.use(express.static('./dist'));

http.createServer(app).listen(80, function () {
    console.log('Angular application run on 80 port');
});