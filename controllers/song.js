const mongoose = require("mongoose");

var songSchema = mongoose.Schema({
    name: String,
    artist: String
});
var Song = mongoose.model('song', songSchema);

class SongController {
    
    constructor() {
    }
    addSong(req, res) {
        if (req.body.artist) {

            var regexpName = new RegExp(req.body.name, "i");
            var regexpArtist = new RegExp(req.body.artist);
            Song.find({ name: regexpName, artist: regexpArtist}).then(list => {
                if (list.length < 1) {
                    let bei = new Song({ name: req.body.name, artist: req.body.artist });
                    bei.save(function (err) {
                        if (err) return handleError(err);
                        res.send("Song added!")
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
    searchSong(req, res) {
        var regexp = new RegExp("^"+ req.body.term, "i");
        Song.find({ name: regexp}).then(list => {
            res.send(list);
        })
    }
}
exports.songController = new SongController();