const checkToken = require('./checkToken.js');
const AdminUser = require('./../../models/AdminUser.js');

async function adminAuth(req, res, next) {
    const authHeader = req.headers["cookie"];

    if (!authHeader) {
        return res.sendStatus(401);
    }
    const cookie = authHeader.split("=")[1];

    let check = await checkToken(cookie);
    if (check) {
        req.user = check;
        let admin = await AdminUser.where(['user_id', check.id], 'first');
        if (!admin) {
            return res.sendStatus(401);
        } else {
            req.user.role = admin.role_id;
            req.user.has_update_psw = admin.update_password ? true : false;
            req.user.psw = admin.update_password;
            next();
        }
    } else {
        return res.sendStatus(401);
    }
}

module.exports = adminAuth;