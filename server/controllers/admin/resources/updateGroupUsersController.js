const GroupUser = require('../../../../models/GroupUser.js');
const bcrypt = require('bcrypt');

async function updateGroupUsers(req, res) {
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

    const validMethods = ['CREATE', 'UPDATE', 'DELETE'];
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
        console.log('GROUP USERS RESORCE ADMIN PASSWORD VALIDATION ERROR');
        console.log(error);
        return res.sendStatus(500);
    }

    try {

        switch (req.body.method) {
            case 'CREATE':
                if (!req.body.group_id || !req.body.user_id) {
                    return res.status(417).json({message: 'Missing required data!' });
                }
                let groupId = req.body.group_id;
                if (isNaN(groupId)) {
                    return res.status(417).json({message: 'Group need to be an id(number)!' });
                }
                groupId = parseInt(groupId);
                let userId = req.body.user_id;
                if (isNaN(userId)) {
                    return res.status(417).json({message: 'User need to be an id(number)!' });
                }
                userId = parseInt(userId);
                try {
                    let newGroupUser = await GroupUser.create({
                        group_id: groupId,
                        user_id: userId,
                    });
                    if (!newGroupUser) {
                        throw new Error("Failed to create new group user");
                    }
                } catch (error) {
                    console.log('GROUP USER RESORCE CREATE NEW GROUP USER ERROR');
                    console.log(error);
                    return res.sendStatus(500);
                }
                return res.sendStatus(201);

            case 'UPDATE':
                if (!req.body.group_user_id) {
                    return res.status(417).json({message: 'Missing required data!' });
                }
                let groupUserId = parseInt(req.body.group_user_id);
                let updateGU = await GroupUser.find(groupUserId);
                if (!updateGU) {
                    return res.status(404).json({message: 'Resource not find!' });
                }

                if (req.body.group_id && !isNaN(req.body.main_user)) {
                    updateGU.group_id = parseInt(req.body.group_id);
                }

                if (req.body.user_id && !isNaN(req.body.group_name)) {
                    updateGU.user_id = parseInt(req.body.user_id);
                }

                let updateResult = await updateGU.save();
                if (updateResult) {
                    return res.sendStatus(202);
                } else {
                    return res.status(417).json({message: 'Fail to update group user! ID: ' + updateGU.id});
                }

            case 'DELETE':
                if (!req.body.delete_id) {
                    return res.status(417).json({message: 'Missing Group User Id to delete!' });
                }
                let deleteId = parseInt(req.body.delete_id);
                let deleteResult = await GroupUser.delete(deleteId);
                if (deleteResult) {
                    return res.sendStatus(200);
                } else {
                    return res.status(417).json({message: 'Failed to delete group user! ID: ' + req.body.delete_id });
                }

            default:
                return res.status(417).json({message: 'Invalid Method! Method send: ' + req.body.method });
        }
    } catch (error) {
        console.log('GROUP USER RESORCE ADMIN RESOURCE UPDATE ERROR');
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = updateGroupUsers;