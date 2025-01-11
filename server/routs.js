const testController = require('./controllers/testController.js');
const path = require('path');
const usernameCheckController = require('./controllers/usernameCheckController.js');
const registerController = require('./controllers/registerController.js');
const loginController = require('./controllers/loginController.js');
const auth = require('./middlewares/auth.js');
const userDataController = require('./controllers/resources/userDataController.js');

function apiRouts(app) {
    app.get('/login', async (req, res) => testController(req, res));
    app.post('/api/username-check', async (req, res) => usernameCheckController(req, res));
    app.post('/api/register', async (req, res) => registerController(req, res));
    app.post('/api/login', async (req, res) => loginController(req, res));

    //Auth api routs
    app.get('/api/resources/user-data', auth, (req, res) => userDataController(req, res));


    app.get('/home', auth,  (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.get('/home/*',auth,  (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

     //Serve the app in all not definiated routs, NEED TO BE LAST
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};

module.exports = apiRouts;
