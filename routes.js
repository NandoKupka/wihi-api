const songController = require('./controllers/song');
const artistController = require('./controllers/artist');
const referenceController = require('./controllers/reference');
const songReferenceController = require('./controllers/songReference');

exports.routes = (app) => {
    app.post('/addSong', songController.songController.addSong);
    app.post('/searchSong', songController.songController.searchSong);
    app.post('/searchExactSong', songController.songController.searchExactSong);

    app.post('/addArtist', artistController.artistController.addArtist);
    app.post('/searchArtist', artistController.artistController.searchArtist);
    app.post('/searchExactArtist', artistController.artistController.searchExactArtist);

    app.post('/addReference', referenceController.referenceController.addReference);
    app.post('/searchReference', referenceController.referenceController.searchReference);
    app.get('/getReferenceData/:id', referenceController.referenceController.getReferenceData);

    app.post('/addSongReference', songReferenceController.songReferenceController.addSongReference);
    app.get('/getSongData/:id', songController.songController.getSongData);

    
}
