const User = require('../../models/User.js');

async function usernameCheckController(req, res) {
    if (!req.body.username) {
        res.status(417).json({message:'bad'});
        return;
    }
    let username = req.body.username;
    username = username.trim();

    // let result = await User.test();

    // console.log(result);
    setTimeout(() => {
        //Check in database if the username is allready in use (right now just simulating)
        res.json({message:'ok'});
    }, 300);
}

module.exports = usernameCheckController;
