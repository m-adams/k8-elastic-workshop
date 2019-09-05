

const express = require('express');
const favicon = require('express-favicon');
const rp = require('request-promise');
var cors = require('cors')
var bodyParser     =        require("body-parser");

const path = require('path');
const port = process.env.PORT || 8081;
const backend_service_url = process.env.BACKEND_SERVICE || "http://localhost:1234";
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/api/items', function (req, res) {
  rp(backend_service_url + '/api/items').then(body => {
     res.send(body)
 }).catch(err => {
     res.send(err)
 });
})

app.get('/api/items/:itemID', function (req, res) {
  rp(backend_service_url + '/api/items/' + req.params['itemID']).then(body => {
     res.send(body)
 }).catch(err => {
     res.send(err)
 });
})

app.post('/api/items', function (req, res) {
  res.send('hello world')
})

app.post('/api/orders', function (req, res) {
  rp({
    method: "POST",
    uri: backend_service_url + '/api/orders',
    body: req.body,
    json: true
  }).then(body => {
     res.send(body)
 }).catch(err => {
     res.send(err)
 });
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
	console.log("Express app live on port " + port + ". Backend Service is on " + backend_service_url)
});