const mongoose = require("mongoose");

var songReferenceSchema = mongoose.Schema({
    reference: String,
    song: String,
    like: Number,
    dislike: Number
});
var SongReference = mongoose.model('songReference', songReferenceSchema);

class SongReferenceController {
    
    constructor() {
    }

    getReferencesIdsBySongId(id) {
        return SongReference.find({song: id}).then(refs => {
            return refs;
        })
    }

    addSongReference(req, res) {
        let item = new SongReference({ reference: req.body.reference, song: req.body.song, like: 0, dislike: 0 });
        item.save(function (err) {
            if (err) return handleError(err);
            res.send("Song added!")
        });
    }
}

exports.songReferenceController = new SongReferenceController();