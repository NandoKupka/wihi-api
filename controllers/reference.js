const mongoose = require("mongoose");

var referenceSchema = mongoose.Schema({
    name: String,
    category: String,
    imageUrl: String,
    description: String
});
var Reference = mongoose.model('reference', referenceSchema);

class ReferenceController {
    
    constructor() {
    }
    addReference(req, res) {
        var regexpName = new RegExp(req.body.name, "i");
        Reference.find({ name: req.body.name }).then(list => {
            if (list.length < 1) {
                let bei = new Reference({
                    name: req.body.name,
                    category: req.body.category,
                    imageUrl: req.body.imageUrl,
                    description: req.body.description
                });

                bei.save(function (err) {
                    if (err) return handleError(err);
                    res.send("Reference added!")
                });
            }
            else {
                res.status(400).send("Reference already exists!")
            }
        })
        
    }
    listReferences(req, res) {
        Reference.find().then(list => {
            res.send(list);
        })
    }
    searchReference(req, res) {
        var regexp = new RegExp("^"+ req.body.term, "i");
        Reference.find({ name: regexp}).limit(5).then(list => {
            res.send(list);
        })
    }
    getReferenceData(req, res) {
        Reference.findOne({ _id: req.params.id}).then(ref => {
            res.send(ref);
        })
    }
}
exports.referenceController = new ReferenceController();