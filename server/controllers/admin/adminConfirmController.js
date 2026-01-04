const bcrypt = require('bcrypt');

async function adminConfirm(req, res) {
    if (!req.user) {
        return res.sendStatus(401);
    }

    if (!req.user.role) {
        return res.sendStatus(401);
    }

    if (!req.body.password) {
        return res.sendStatus(401);
    }

    let password = req.body.password;
    password = password.trim();

    try {
        let validPassword = await bcrypt.compare(password, req.user.password);
        if (!validPassword) {
            return res.sendStatus(401);
        }

        return res.sendStatus(200);

    } catch (error) {
        console.log('ADMIN LOGIN CATCH ERROR');
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = adminConfirm;
