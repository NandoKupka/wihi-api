const songController = require('./controllers/song');
const artistController = require('./controllers/artist');

exports.routes = (app) => {
    app.post('/searchSong', songController.songController.searchSong);
    app.post('/addSong', songController.songController.addSong);
    app.get('/listSongs', songController.songController.listSongs)

    app.post('/searchArtist', artistController.artistController.searchArtist);
    app.post('/addArtist', artistController.artistController.addArtist);
}
