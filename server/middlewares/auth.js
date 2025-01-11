const checkToken = require('./checkToken.js');

async function auth(req, res, next) {
    const authHeader = req.headers["cookie"];

    if (!authHeader) {
        return res.sendStatus(401);
    }
    const cookie = authHeader.split("=")[1];

    let check = await checkToken(cookie);
    if (check) {
        req.user = check;
        next();
    } else {
        return res.sendStatus(401);
    }
}

module.exports = auth;