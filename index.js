const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const routes = require('./routes');
var mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(cors())
app.use(bodyParser.json())
routes.routes(app)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});