const bcrypt = require('bcrypt');
const User = require('../../../models/User.js');

async function deleteUser(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    if (!req.body.password) {
        res.sendStatus(400);
        return;
    }

    let password = req.body.password;
    password = password.trim();

    let validPassword = await bcrypt.compare(password, req.user.password);
    if (!validPassword) {
        res.sendStatus(417);
        return;
    }

    try {
        let result = User.delete(req.user.id)
        if (result) {
            let options = {
                maxAge: 0,
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
            };
            res.cookie('SessionId', '', options);
            res.sendStatus(200);
        } else {
            res.sendStatus(417);
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

module.exports = deleteUser;
