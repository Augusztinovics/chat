const User = require('../../models/User.js');
const bcrypt = require('bcrypt');
const generateToken = require('../middlewares/generateToken.js');

async function loginController(req, res) {
    let hpot = req?.body?.hpot;
    if (hpot) {
        res.status(401).json({message:'pot'});
        return;
    }
    if (!req.body.username) {
        res.status(401).json({message:'username'});
        return;
    }
    if (!req.body.password) {
        res.status(401).json({message:'password'});
        return;
    }

    let username = req.body.username;
    username = username.trim();
    let password = req.body.password;
    password = password.trim();

    let remember = req.body.rememberMe ?? false;

    let user = null;
    try {
        user = await User.where(['username', username], 'first');
    } catch (error) {
        res.status(500).json({message:'Server Error'});
        return;
    }

    if (!user) {
        res.status(401).json({message:'invalid user'});
        return;
    }

    try {
        let validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({message:'invalid user'});
            return;
        }

        let time = remember ? '8760h' : '8h';
        let token = generateToken(user, time);
        if (!token) {
            throw new Error("Failed to generate token");
        }
        let expire = remember ? (8760 * 60 * 60 * 1000) : (8 * 60 * 60 * 1000);
        let options = {
            maxAge: expire,
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        };
        res.cookie('SessionId', token, options);
        res.json({message:'ok'});

    } catch (error) {
        console.log('LOGIN CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = loginController;
