const testController = require('./controllers/testController.js');
const path = require('path');
const usernameCheckController = require('./controllers/usernameCheckController.js');

function apiRouts(app) {
    app.get('/test', (req, res) => testController(req, res));
    app.post('/username-check', (req, res) => usernameCheckController(req, res));


    //Serve the app in all not definiated routs, NEED TO BE LAST
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};

module.exports = apiRouts;
