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
        var regexp = new RegExp(req.body.name, "i");
        Song.find({ name: regexp}).then(list => {
            if (list.length < 1) {
                let bei = new Song({ name: req.body.name, artist: req.body.artist });
                bei.save(function (err) {
                    if (err) return handleError(err);
                    res.send(res.body.name)
                });
            }
        })
        
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