const songController = require('./controllers/song');
const artistController = require('./controllers/artist');
const referenceController = require('./controllers/reference');

exports.routes = (app) => {
    app.post('/addSong', songController.songController.addSong);
    app.post('/searchSong', songController.songController.searchSong);
    app.get('/listSongs', songController.songController.listSongs)

    app.post('/addArtist', artistController.artistController.addArtist);
    app.post('/searchArtist', artistController.artistController.searchArtist);

    app.post('/addReference', referenceController.referenceController.addReference);
    app.post('/searchReference', referenceController.referenceController.searchReference);
}
