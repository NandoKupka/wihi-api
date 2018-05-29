const functions = require('firebase-functions');
const express = require('express');
const app = express();

const firebase = require('firebase-admin');
const serviceAccount = require('./key.json');

const cors = require('cors');
app.use(cors());

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://wihi-api.firebaseio.com/'
});


app.post('/addSong', (req, res) => {
    firebase.database().ref('songs').push({
        name: req.body.name,
        artist: req.body.artist
    }).then(x => {
        res.send("OK")
    })
})

app.post('/addArtist', (req, res) => {
    firebase.database().ref('artist').push({
        name: req.body.name
    }).then(x => {
        res.send("OK")
    })
})

app.get('/getSongs', (req, res) => {
    return firebase.database().ref('/songs').once('value').then(function(snapshot) {
        res.json(snapshot);
        return snapshot;
    });
})

app.post('/searchSong', (req, res) => {
    return firebase.database().ref('/songs').orderByChild('name').startAt(req.body.term).endAt(req.body.term+"\uf8ff").once("value")
    .then(function(snapshot) {
        res.json(snapshot);
        return snapshot;
    });
})

app.get('/getArtists', (req, res) => {
    return firebase.database().ref('/artist').once('value').then(function(snapshot) {
        res.json(snapshot);
        return snapshot;
    });
})

exports.app = functions.https.onRequest(app);