const bcrypt = require('bcrypt');
const AdminUser = require('./../../../models/AdminUser.js');

async function adminChangePassword(req, res) {
    if (!req.user) {
        return res.sendStatus(401);
    }

    if (!req.user.role) {
        return res.sendStatus(401);
    }

    if (!req.body.password) {
        return res.sendStatus(417);
    }

    if (!req.body.re_password) {
        return res.sendStatus(417);
    }

    if (req.body.password != req.body.re_password) {
        return res.sendStatus(417);
    }

    if (req.user.has_update_psw && !req.body.confirm_password) {
        return res.sendStatus(417);
    }

    let password = req.body.password;
    password = password.trim();

    let confirmPassword = req.body.confirm_password ?? null;
    if (confirmPassword) {
        confirmPassword = confirmPassword.trim();
    }

    let admin = await AdminUser.where(['user_id', req.user.id], 'first');

    if (!admin) {
        return res.sendStatus(401);
    }

    try {
        if (confirmPassword) {
            let validPassword = await bcrypt.compare(confirmPassword, admin.update_password);
            if (!validPassword) {
                return res.sendStatus(401);
            }
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        admin.update_password = hashedPassword;
        let update = await admin.save();
        if (update) {
            return res.sendStatus(200);
        } else {
            throw new Error("Failed to save password");
        }

    } catch (error) {
        console.log('ADMIN LOGIN CATCH ERROR');
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = adminChangePassword;
