const mongoose = require("mongoose");

var songSchema = mongoose.Schema({
    name: String,
    artist: {
        name: String,
        _id: String
    }
});
var Song = mongoose.model('song', songSchema);

class SongController {
    
    constructor() {
    }
    importSongs(text) {
        var artistSchema = mongoose.Schema({
            name: String,
        });
        
        var Artist = mongoose.model('artist', artistSchema);

        let songList = text.split('|')
        let arr = []
        songList.forEach(x => ary.push(x.split('-')))

        songList.forEach(x => {

            let bei = new Artist({ name: req.body.name});
            bei.save(function (err, a) {
                if (err) return handleError(err);
                // res.send(req.body.name)
            });

            // let bei = new Song({ name: req.body.name, artist: req.body.artist });

            // bei.save(function (err) {
            //     if (err) return handleError(err);
            // });
        })
    } 
    addSong(req, res) {
        if (req.body.artist) {

            var regexpName = new RegExp(req.body.name, "i");
            Song.find({ name: regexpName, artist: req.body.artist}).then(list => {
                if (list.length < 1) {
                    let bei = new Song({ name: req.body.name, artist: req.body.artist });
                    bei.save(function (ae, err) {
                        res.send(err)
                    });
                }
                else {
                    res.status(400).send("Song already exists!")
                }
            })
        }
        else {
            res.status(400).send("Please select an existing artist or create one!")
        }
        
    }
    listSongs(req, res) {
        Song.find().then(list => {
            res.send(list);
        })
    }
    searchExactSong(req, res) {
        Song.find({ name: req.body.term}).limit(5).then(list => {
            res.send(list);
        })
    }
    searchSong(req, res) {
        var regexp = new RegExp("^"+ req.body.term, "i");
        Song.find({ name: regexp}).limit(5).then(list => {
            res.send(list);
        })
    }
}
exports.songController = new SongController();