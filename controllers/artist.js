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
                bei.save(function (ae, err) {
                    res.send(err)
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
        Artist.find({ name: regexp}).sort({name: 1}).limit(5).then(list => {
            res.send(list);
        })
    }

    searchExactArtist(req, res) {
        Artist.find({ name: req.body.term}).sort({name: 1}).limit(5).then(list => {
            res.send(list);
        })
    }
}
exports.artistController = new ArtistController();