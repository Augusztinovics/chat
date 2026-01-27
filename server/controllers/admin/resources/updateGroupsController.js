const Group = require('../../../../models/Group.js');
const bcrypt = require('bcrypt');

async function updateGroups(req, res) {
    if (!req.user) {
        return res.status(401).json({message: 'No Usert'});
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
        console.log('GROUPS RESORCE ADMIN PASSWORD VALIDATION ERROR');
        console.log(error);
        return res.sendStatus(500);
    }

    try {

        switch (req.body.method) {
            case 'CREATE':
                if (!req.body.main_user || !req.body.group_name) {
                    return res.status(417).json({message: 'Missing required data!' });
                }
                let groupName = req.body.group_name.trim();
                if (groupName.length < 1) {
                    return res.status(417).json({message: 'Group Name is too short!' });
                }
                let mainUser = req.body.main_user;
                if (isNaN(mainUser)) {
                    return res.status(417).json({message: 'Main User need to be an id(number)!' });
                }
                mainUser = parseInt(mainUser);
                try {
                    let newGroup = await Group.create({
                        main_user: mainUser,
                        group_name: groupName,
                    });
                    if (!newGroup) {
                        throw new Error("Failed to create new group");
                    }
                } catch (error) {
                    console.log('GROUPS RESORCE CREATE NEW GROUP ERROR');
                    console.log(error);
                    return res.sendStatus(500);
                }
                return res.sendStatus(201);

            case 'UPDATE':
                if (!req.body.group_id) {
                    return res.status(417).json({message: 'Missing required data!' });
                }
                let groupId = parseInt(req.body.group_id);
                let updateG = await Group.find(groupId);
                if (!updateG) {
                    return res.status(404).json({message: 'Resource not find!' });
                }

                if (req.body.main_user && !isNaN(req.body.main_user)) {
                    updateG.main_user = parseInt(req.body.main_user);
                }

                if (req.body.group_name && req.body.group_name.trim().length > 0) {
                    updateG.group_name = req.body.group_name.trim();
                }

                let updateResult = await updateG.save();
                if (updateResult) {
                    return res.sendStatus(202);
                } else {
                    return res.status(417).json({message: 'Fail to update group! ID: ' + updateG.id });
                }

            case 'DELETE':
                if (!req.body.delete_id) {
                    return res.status(417).json({message: 'Missing Group Id to delete!' });
                }
                let deleteId = parseInt(req.body.delete_id);
                let deleteResult = await Group.delete(deleteId);
                if (deleteResult) {
                    return res.sendStatus(200);
                } else {
                    return res.status(417).json({message: 'Failed to delete group! ID: ' + req.body.delete_id });
                }

            default:
                return res.status(417).json({message: 'Invalid Method! Method send: ' + req.body.method });
        }
    } catch (error) {
        console.log('GROUPS RESORCE ADMIN RESOURCE UPDATE ERROR');
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = updateGroups;