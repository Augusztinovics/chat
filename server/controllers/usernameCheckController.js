const User = require('../../models/User.js');

async function usernameCheckController(req, res) {
    if (!req.body.username) {
        res.status(417).json({message:'bad'});
        return;
    }
    let username = req.body.username;
    username = username.trim();

    try {
        let result = await User.where(['username', username], 'first');
        console.log(result);
        if (result) {
            res.status(417).json({message:'bad'});
        } else {
            res.json({message:'ok'});
        }
    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }

}

module.exports = usernameCheckController;
