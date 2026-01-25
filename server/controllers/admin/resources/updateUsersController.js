const User = require('../../../../models/User.js');
const bcrypt = require('bcrypt');

async function updateUsers(req, res) {
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
        console.log('USERS RESORCE ADMIN PASSWORD VALIDATION ERROR');
        console.log(error);
        return res.sendStatus(500);
    }

    if (req.body.method == 'CREATE' || req.body.method == 'UPDATE') {
        if (req.body.username) {
            let inUse = await User.where(['username', req.body.username.trim()], 'first');
            if (inUse) {
                return res.status(417).json({message: 'Username ' + req.body.username + ' is already in use, select different one!' });
            }
        }
        if (req.body.email) {
            let emailInUse = await User.where(['email', req.body.email.trim()], 'first');
            if (emailInUse) {
                return res.status(417).json({message: 'Email ' + req.body.email + ' is already in use, select different one!' });
            }
        }
    }

    try {

        switch (req.body.method) {
            case 'CREATE':
                if (!req.body.username || !req.body.password) {
                    return res.status(417).json({message: 'Missing required data!' });
                }
                let psw = req.body.password.trim();
                if (psw.length < 6) {
                    return res.status(417).json({message: 'Password is too short!' });
                }
                try {
                    let hashedPassword = await bcrypt.hash(psw, 10);
                    let newUser = await User.create({
                        username: req.body.username.trim(),
                        password: hashedPassword,
                        email: req.body.email.trim() ?? null,
                        lg: req.body.lg ?? 'HU',
                        country: req.body.country ?? null,
                        city: req.body.city ?? null,
                        description: req.body.description ?? null,
                        ip: req.body.ip ?? null,
                        device_data: req.body.device_data ?? null,
                    });
                    if (!newUser) {
                        throw new Error("Failed to create new user");
                    }
                } catch (error) {
                    console.log('USERS RESORCE CREATE NEW USER ERROR');
                    console.log(error);
                    return res.sendStatus(500);
                }
                return res.sendStatus(201);

            case 'UPDATE':
                if (!req.body.user_id) {
                    return res.status(417).json({message: 'Missing required data!' });
                }
                let userId = parseInt(req.body.user_id);
                let updateU = await User.find(userId);
                if (!updateU) {
                    return res.status(404).json({message: 'Resource not find!' });
                }

                if (req.body.username) {
                    updateU.username = req.body.username.trim();
                }

                if (req.body.email) {
                    if (req.body.email.trim().length > 6 && req.body.email.includes('@')) {
                        updateU.email = req.body.email.trim();
                    }
                }

                if (req.body.lg) {
                    updateU.lg = req.body.lg;
                }

                if (req.body.country) {
                    updateU.country = req.body.country.trim();
                }

                if (req.body.city) {
                    updateU.city = req.body.city.trim();
                }

                if (req.body.description) {
                    updateU.description = req.body.description.trim();
                }

                if (req.body.ip) {
                    updateU.ip = req.body.ip.trim();
                }

                if (req.body.device_data) {
                    updateU.device_data = req.body.device_data.trim();
                }
                let updateResult = await updateU.save();
                if (updateResult) {
                    return res.sendStatus(202);
                } else {
                    return res.status(417).json({message: 'Fail to update user! ID: ' + updateU.id });
                }

            case 'DELETE':
                if (!req.body.delete_id) {
                    return res.status(417).json({message: 'Missing User Id to delete!' });
                }
                let deleteId = parseInt(req.body.delete_id);
                let deleteResult = await User.delete(deleteId);
                if (deleteResult) {
                    return res.sendStatus(200);
                } else {
                    return res.status(417).json({message: 'Failed to delete user! ID: ' + req.body.delete_id });
                }

            default:
                return res.status(417).json({message: 'Invalid Method! Method send: ' + req.body.method });
        }
    } catch (error) {
        console.log('USERS RESORCE ADMIN RESOURCE UPDATE ERROR');
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = updateUsers;