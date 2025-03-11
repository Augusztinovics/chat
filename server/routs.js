const testController = require('./controllers/testController.js');
const path = require('path');
const usernameCheckController = require('./controllers/usernameCheckController.js');
const registerController = require('./controllers/registerController.js');
const loginController = require('./controllers/loginController.js');
const logoutController = require('./controllers/logoutController.js');
const auth = require('./middlewares/auth.js');
const userDataController = require('./controllers/resources/userDataController.js');
const userUpdateController = require('./controllers/resources/userUpdateController.js');
const deleteUserController = require('./controllers/resources/userDeleteController.js');
const userSearchController = require('./controllers/resources/userSearchController.js');
const getSendedFriendRequestsController = require('./controllers/resources/friendRequests/getSendedFriendRequestsController.js');
const sendFriendRequestController = require('./controllers/resources/friendRequests/sendFriendRequestController.js');
const deleteSendedRequestController = require('./controllers/resources/friendRequests/deleteSendedRequestController.js');
const editFriendRequestController = require('./controllers/resources/friendRequests/editFriendRequestController.js');
const getReceivedFriendRequestsController = require('./controllers/resources/friendRequests/getReceivedRequestController.js');

function apiRouts(app) {
    app.get('/login', async (req, res) => testController(req, res));
    app.get('/logout', async (req, res) => logoutController(req, res));
    app.post('/api/username-check', async (req, res) => usernameCheckController(req, res));
    app.post('/api/register', async (req, res) => registerController(req, res));
    app.post('/api/login', async (req, res) => loginController(req, res));

    //Auth api routs
    //User
    app.get('/api/resources/user-data', auth, (req, res) => userDataController(req, res));
    app.post('/api/resources/user-update', auth, async (req, res) => userUpdateController(req, res));
    app.post('/api/resources/user-delete', auth, async (req, res) => deleteUserController(req, res));
    app.get('/api/resources/search-user', auth, (req, res) => userSearchController(req, res));

    //Friend requests
    app.get('/api/resources/sended-friend-requests', auth, async (req, res) => getSendedFriendRequestsController(req, res));
    app.post('/api/resources/friend-request-send', auth, async (req, res) => sendFriendRequestController(req, res));
    app.post('/api/resources/friend-request-delete', auth, async (req, res) => deleteSendedRequestController(req, res));
    app.post('/api/resources/friend-request-edit', auth, async (req, res) => editFriendRequestController(req, res));
    app.get('/api/resources/received-friend-requests', auth, async (req, res) => getReceivedFriendRequestsController(req, res));


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
