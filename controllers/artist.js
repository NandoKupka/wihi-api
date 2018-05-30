const mongoose = require("mongoose");

var artistSchema = mongoose.Schema({
    name: String,
});

var Artist = mongoose.model('artist', artistSchema);

class ArtistController {
    
    constructor() {
    }
    addArtist(req, res) {
        var regexp = new RegExp(req.body.name, "i");
        Artist.find({ name: regexp}).then(list => {
            if (list.length < 1) {
                let bei = new Artist({ name: req.body.name});
                bei.save(function (err) {
                    if (err) return handleError(err);
                    res.send(req.body.name)
                });
            }
            else {
                res.status(400).send("Artist already exists!")
            }
        })
    }
    listArtists(req, res) {
        Artist.find().then(list => {
            res.send(list);
        })
    }
    getArtistByID(req, res) {
        Artist.findOne({_id: req.body.id}).then(list => {
            res.send(list);
        })
    }
    searchArtist(req, res) {
        var regexp = new RegExp("^"+ req.body.term, "i");
        Artist.find({ name: regexp}).then(list => {
            res.send(list);
        })
    }
}
exports.artistController = new ArtistController();