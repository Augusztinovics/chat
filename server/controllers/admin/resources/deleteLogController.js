const Log = require('../../../../models/Log.js');
const bcrypt = require('bcrypt');

async function deleteLog(req, res) {
    if (!req.user) {
        return res.status(401).json({message: 'No User'});
    }

    if (!req.user.role) {
        return res.status(401).json({message: 'No Role'});
    }

    if (req.user.role < 2) {
        return res.status(401).json({message: 'Role less then 2'});
    }

    if (!req.body.method) {
        return res.status(417).json({message: 'No Method Present'});
    }

    const validMethods = ['DELETE'];
    if (!validMethods.includes(req.body.method)) {
        return res.status(417).json({message: 'Invalid Method! Method send: ' + req.body.method });
    }

    if (!req.body.psw) {
         return res.status(401).json({message: 'No psw'});
    }

    try {
        let validPassword = await bcrypt.compare(req.body.psw, req.user.psw);
        if (!validPassword) {
             return res.status(401).json({message: 'Psw not valid'});
        }
    } catch (error) {
        console.log('LOGS RESORCE ADMIN PASSWORD VALIDATION ERROR');
        console.log(error);
        return res.sendStatus(500);
    }

    try {
        if (!req.body.delete_id) {
            return res.status(417).json({message: 'Missing Log Id to delete!' });
        }
        let deleteId = parseInt(req.body.delete_id);
        let deleteResult = await Log.delete(deleteId);
        if (deleteResult) {
            return res.sendStatus(200);
        } else {
            return res.status(417).json({message: 'Failed to delete log! ID: ' + req.body.delete_id });
        }
    } catch (error) {
        console.log('LOGS RESORCE ADMIN RESOURCE DELETE ERROR');
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = deleteLog;