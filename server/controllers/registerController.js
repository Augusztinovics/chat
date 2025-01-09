const User = require('../../models/User.js');

async function registerController(req, res) {
    let hpot = req?.body?.hpot;
    if (hpot) {
        res.status(400).json({message:'pot'});
        return;
    }
    if (!req.body.username) {
        res.status(400).json({message:'username'});
        return;
    }
    if (!req.body.password) {
        res.status(400).json({message:'password'});
        return;
    }
    if (!req.body.acceptTerms) {
        res.status(400).json({message:'terms'});
        return;
    }
    let username = req.body.username;
    username = username.trim();
    let password = req.body.password;
    password = password.trim();

    if (password.length < 6) {
        res.status(400).json({message:'password'});
        return;
    }

    try {
        let result = await User.where(['username', username], 'first');
        if (result) {
            res.status(417).json({message:'invalid_username'});
        }
    } catch (error) {
        res.status(500).json({message:'Server Error'});
        return;
    }

    let lg = req.body.lg ?? 'HU';
    let ip = req.ip || req.socket.remoteAddress;
    let deviceData = JSON.stringify(req.headers);

    //btoa() string to base64
    //atob() base64 to string

    let newUser = null;
    try {
        newUser = await User.create({
            username: username,
            password: btoa(password),
            lg: lg,
            ip: ip,
            device_data: deviceData,
        });

        console.log(newUser);

        if (!newUser) {
            throw new Error("New user not exist");
        }

        //Login the new user, then:
        res.json({message:'ok'});
    } catch (error) {
        console.log('CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = registerController;
