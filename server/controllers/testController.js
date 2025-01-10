const checkToken = require('../middlewares/checkToken.js');
const path = require('path');

async function testController(req, res) {
    const authHeader = req.headers["cookie"];
    console.log('TEST CONTROLLER HIT');
    console.log(authHeader);
    if (!authHeader) {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
        return;
    }
    const cookie = authHeader.split("=")[1];
    console.log(cookie);

    let check = await checkToken(cookie);
    console.log(check);
    if (check) {
        res.redirect('/home');
    } else {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
    }
}

module.exports = testController;