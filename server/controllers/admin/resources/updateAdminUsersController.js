const AdminUser = require('../../../../models/AdminUser.js');
const bcrypt = require('bcrypt');

async function updateAdminUsers(req, res) {
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
        console.log('ADMIN USERS RESORCE ADMIN PASSWORD VALIDATION ERROR');
        console.log(error);
        return res.sendStatus(500);
    }

    try {

        switch (req.body.method) {
            case 'CREATE':
                if (!req.body.user_id || !req.body.role_id) {
                    return res.status(417).json({message: 'Missing required data!' });
                }

                let userId = req.body.user_id;
                if (isNaN(userId)) {
                    return res.status(417).json({message: 'User need to be an id(number)!' });
                }
                userId = parseInt(userId);

                let roleId = req.body.role_id;
                if (isNaN(roleId)) {
                    return res.status(417).json({message: 'Role need to be an int!' });
                }
                roleId = parseInt(roleId);
                try {
                    let newAdminUser = await AdminUser.create({
                        user_id: userId,
                        role_id: roleId,
                    });
                    if (!newAdminUser) {
                        throw new Error("Failed to create new admin user");
                    }
                } catch (error) {
                    console.log('ADMIN USER RESORCE CREATE NEW GROUP USER ERROR');
                    console.log(error);
                    return res.sendStatus(500);
                }
                return res.sendStatus(201);

            case 'UPDATE':
                if (!req.body.admin_user_id) {
                    return res.status(417).json({message: 'Missing required data!' });
                }
                let adminUserId = parseInt(req.body.admin_user_id);
                let updateAU = await AdminUser.find(adminUserId);
                if (!updateAU) {
                    return res.status(404).json({message: 'Resource not find!' });
                }

                if (req.body.role_id && !isNaN(req.body.role_id)) {
                    updateAU.role_id = parseInt(req.body.role_id);
                }

                if (req.body.user_id && !isNaN(req.body.user_id)) {
                    updateAU.user_id = parseInt(req.body.user_id);
                }

                let updateResult = await updateAU.save();
                if (updateResult) {
                    return res.sendStatus(202);
                } else {
                    return res.status(417).json({message: 'Fail to update admin user! ID: ' + updateAU.id});
                }

            case 'DELETE':
                if (!req.body.delete_id) {
                    return res.status(417).json({message: 'Missing Admin User Id to delete!' });
                }
                let deleteId = parseInt(req.body.delete_id);
                let deleteResult = await AdminUser.delete(deleteId);
                if (deleteResult) {
                    return res.sendStatus(200);
                } else {
                    return res.status(417).json({message: 'Failed to delete admin user! ID: ' + req.body.delete_id });
                }

            default:
                return res.status(417).json({message: 'Invalid Method! Method send: ' + req.body.method });
        }
    } catch (error) {
        console.log('ADMIN USER RESORCE ADMIN RESOURCE UPDATE ERROR');
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = updateAdminUsers;