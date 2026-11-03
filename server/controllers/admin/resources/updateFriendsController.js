const Friend = require('../../../../models/Friend.js');
const bcrypt = require('bcrypt');

async function updateFriends(req, res) {
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
        console.log('FRIENDS RESORCE ADMIN PASSWORD VALIDATION ERROR');
        console.log(error);
        return res.sendStatus(500);
    }

    try {

        switch (req.body.method) {
            case 'CREATE':
                if (!req.body.from_user || !req.body.to_user) {
                    return res.status(417).json({message: 'Missing required data!' });
                }
                let message = req.body.message ? req.body.message.trim() : '';

                let fromUser = req.body.from_user;
                if (isNaN(fromUser)) {
                    return res.status(417).json({message: 'From User need to be an id(number)!' });
                }
                fromUser = parseInt(fromUser);
                let toUser = req.body.to_user;
                if (isNaN(toUser)) {
                    return res.status(417).json({message: 'To User need to be an id(number)!' });
                }
                toUser = parseInt(toUser);
                try {
                    let newFriend = await Friend.create({
                        from_user: fromUser,
                        to_user:   toUser,
                        message:   message,
                    });
                    if (!newFriend) {
                        throw new Error("Failed to create new friend");
                    }
                } catch (error) {
                    console.log('FRIENDS RESORCE CREATE NEW FRIEND ERROR');
                    console.log(error);
                    return res.sendStatus(500);
                }
                return res.sendStatus(201);

            case 'UPDATE':
                if (!req.body.friend_id) {
                    return res.status(417).json({message: 'Missing required data!' });
                }
                let friendId = parseInt(req.body.friend_id);
                let updateF = await Friend.find(friendId);
                if (!updateF) {
                    return res.status(404).json({message: 'Resource not find!' });
                }

                if (req.body.from_user && !isNaN(req.body.from_user)) {
                    updateF.from_user = parseInt(req.body.from_user);
                }

                if (req.body.to_user && !isNaN(req.body.to_user)) {
                    updateF.to_user = parseInt(req.body.to_user);
                }

                if (req.body.message && req.body.message.trim().length > 0) {
                    updateF.message = req.body.message.trim();
                }

                let updateResult = await updateF.save();
                if (updateResult) {
                    return res.sendStatus(202);
                } else {
                    return res.status(417).json({message: 'Fail to update friend! ID: ' + updateF.id });
                }

            case 'DELETE':
                if (!req.body.delete_id) {
                    return res.status(417).json({message: 'Missing Friend Id to delete!' });
                }
                let deleteId = parseInt(req.body.delete_id);
                let deleteResult = await Friend.delete(deleteId);
                if (deleteResult) {
                    return res.sendStatus(200);
                } else {
                    return res.status(417).json({message: 'Failed to delete friend! ID: ' + req.body.delete_id });
                }

            default:
                return res.status(417).json({message: 'Invalid Method! Method send: ' + req.body.method });
        }
    } catch (error) {
        console.log('FRIENDS RESORCE ADMIN RESOURCE UPDATE ERROR');
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = updateFriends;