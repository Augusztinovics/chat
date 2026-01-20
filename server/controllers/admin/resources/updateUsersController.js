const User = require('../../../../models/User');
const bcrypt = require('bcrypt');

async function updateUsers(req, res) {
    if (!req.user) {
        return res.sendStatus(401);
    }

    if (!req.user.role) {
        return res.sendStatus(401);
    }

    if (!req.user.role < 2) {
        return res.sendStatus(401);
    }

    if (!req.body.method) {
        return res.status(417).json({message: 'No Method Present'});
    }

    const validMethods = ['CREATE', 'UPDATE', 'DELETE'];
    if (!validMethods.includes(req.body.method)) {
        return res.status(417).json({message: 'Invalid Method! Method send: ' + req.body.method });
    }

    if (!req.body.psw) {
        return res.sendStatus(401);
    }

    try {
        let validPassword = await bcrypt.compare(req.body.psw, req.user.psw);
        if (!validPassword) {
            return res.sendStatus(401);
        }
    } catch (error) {
        console.log('ADMIN USERS UPDATE CATCH ERROR');
        console.log(error);
        return res.sendStatus(500);
    }

    switch (req.body.method) {
        case 'CREATE':
            
            break;

        case 'UPDATE':
            
            break;

        case 'DELETE':
            
            break;

        default:
            return res.status(417).json({message: 'Invalid Method! Method send: ' + req.body.method });
    }
}

module.exports = updateUsers;