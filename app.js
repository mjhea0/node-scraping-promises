
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    Q = require("q"),
    // use Q.denodeify() to translate the callback style function to a promise style function
    request = Q.denodeify(require('request'));

var app = express();

// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);



function getJSON() {
  var response = request({
    uri: "https://duckduckgo.com/?q=node",
    method: 'GET'
  })
  return response.then(function (res) {
    if (res.statusCode >= 300) {
      throw new Error('Server responded with status code ' + res.statusCode)
    } else {
      // return res.body.toString()
      console.log(res[0].body.toString())
    }
  })
}

getJSON()


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
