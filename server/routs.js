const testController = require('./controllers/testController.js');

function apiRouts(app) {
    app.get('/test', (req, res) => testController(req, res));
};

module.exports = apiRouts;
