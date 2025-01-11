const checkToken = require('../middlewares/checkToken.js');
const path = require('path');

async function testController(req, res) {
    const authHeader = req.headers["cookie"];

    if (!authHeader) {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
        return;
    }
    const cookie = authHeader.split("=")[1];

    let check = await checkToken(cookie);
    if (check) {
        res.redirect('/home');
    } else {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
    }
}

module.exports = testController;