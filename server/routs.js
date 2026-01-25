const testController = require('./controllers/testController.js');
const path = require('path');
const usernameCheckController = require('./controllers/usernameCheckController.js');
const registerController = require('./controllers/registerController.js');
const loginController = require('./controllers/loginController.js');
const logoutController = require('./controllers/logoutController.js');
const auth = require('./middlewares/auth.js');
const adminAuth = require('./middlewares/adminAuth.js');
const userDataController = require('./controllers/resources/userDataController.js');
const userUpdateController = require('./controllers/resources/userUpdateController.js');
const deleteUserController = require('./controllers/resources/userDeleteController.js');
const userSearchController = require('./controllers/resources/userSearchController.js');
const getSendedFriendRequestsController = require('./controllers/resources/friendRequests/getSendedFriendRequestsController.js');
const sendFriendRequestController = require('./controllers/resources/friendRequests/sendFriendRequestController.js');
const deleteSendedRequestController = require('./controllers/resources/friendRequests/deleteSendedRequestController.js');
const editFriendRequestController = require('./controllers/resources/friendRequests/editFriendRequestController.js');
const getReceivedFriendRequestsController = require('./controllers/resources/friendRequests/getReceivedRequestController.js');
const acceptFriendRequestController = require('./controllers/resources/friendRequests/acceptFriendRequestController.js');
const denieFriendRequestController = require('./controllers/resources/friendRequests/denieFriendRequestController.js');
const getFriendsController = require('./controllers/resources/friendRequests/getFriendsController.js');
const createGroupController = require('./controllers/resources/friendRequests/createGroupController.js');
const updateGroupController = require('./controllers/resources/friendRequests/updateGroupController.js');
const getMoreMessageController = require('./controllers/resources/getMoreMessageController.js');
//Admin Controllers
const adminUserDataController = require('./controllers/admin/adminUserDataController.js');
const adminConfirmController = require('./controllers/admin/adminConfirmController.js');
const adminChangePasswordController = require('./controllers/admin/adminChangePasswordController.js');
const fetchUsersController = require('./controllers/admin/resources/fetchUsersController.js');
const updateUsersController = require('./controllers/admin/resources/updateUsersController.js');

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
    app.get('/api/resources/search-user', auth, async (req, res) => userSearchController(req, res));
    app.get('/api/resources/more-message', auth, async (req, res) => getMoreMessageController(req, res));

    //Friend requests
    app.get('/api/resources/sended-friend-requests', auth, async (req, res) => getSendedFriendRequestsController(req, res));
    app.post('/api/resources/friend-request-send', auth, async (req, res) => sendFriendRequestController(req, res));
    app.post('/api/resources/friend-request-delete', auth, async (req, res) => deleteSendedRequestController(req, res));
    app.post('/api/resources/friend-request-edit', auth, async (req, res) => editFriendRequestController(req, res));
    app.get('/api/resources/received-friend-requests', auth, async (req, res) => getReceivedFriendRequestsController(req, res));
    app.post('/api/resources/friend-request-accept', auth, async (req, res) => acceptFriendRequestController(req, res));
    app.post('/api/resources/friend-request-denie', auth, async (req, res) => denieFriendRequestController(req, res));
    app.get('/api/resources/friends', auth, async (req, res) => getFriendsController(req, res));

    //Group requests
    app.post('/api/resources/create-group', auth, async (req, res) => createGroupController(req, res));
    app.post('/api/resources/update-group', auth, async (req, res) => updateGroupController(req, res));

    //Admin api routs
    app.post('/api/admin/admin-confirm', adminAuth, async (req, res) => adminConfirmController(req, res));
    app.post('/api/admin/admin-password', adminAuth, async (req, res) => adminChangePasswordController(req, res));
    app.get('/api/admin/admin-user-data', adminAuth, (req, res) => adminUserDataController(req, res));

    // Admin resource routs
    app.get('/api/admin/users', adminAuth, async (req, res) => fetchUsersController(req, res));
    app.post('/api/admin/users', adminAuth, async (req, res) => updateUsersController(req, res));

    app.get('/home', auth, (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.get('/home/*', auth, (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    //Admin app deo
    app.get('/admin', adminAuth, (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.get('/admin/*', adminAuth, (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

     //Serve the app in all not definiated routs, NEED TO BE LAST
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};

module.exports = apiRouts;
