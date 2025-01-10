const User = require('../../models/User.js');
const bcrypt = require('bcrypt');
const generateToken = require('../middlewares/generateToken.js');

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

    let newUser = null;
    try {
        let hashedPassword = await bcrypt.hash(password, 10);
        newUser = await User.create({
            username: username,
            password: hashedPassword,
            lg: lg,
            ip: ip,
            device_data: deviceData,
        });

        if (!newUser) {
            throw new Error("New user not exist");
        }

        //Login the new user, then:
        let token = generateToken(newUser);
        if (!token) {
            throw new Error("Failed to generate token");
        }

        let options = {
            maxAge: 8 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        };
        res.cookie('SessionId', token, options);
        res.json({message:'ok'});
    } catch (error) {
        console.log('REGISTER CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = registerController;
