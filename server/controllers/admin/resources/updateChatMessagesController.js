const ChatMessage = require('../../../../models/ChatMessage.js');
const bcrypt = require('bcrypt');

async function updateChatMessages(req, res) {
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
        console.log('CHAT MESSAGES RESORCE ADMIN PASSWORD VALIDATION ERROR');
        console.log(error);
        return res.sendStatus(500);
    }

    try {

        switch (req.body.method) {
            case 'CREATE':
                if (!req.body.group_id || !req.body.from_id || !req.body.sender || !req.body.msg) {
                    return res.status(417).json({message: 'Missing required data!' });
                }
                let msg = req.body.msg.trim();
                if (msg.length < 1) {
                    return res.status(417).json({message: 'Message is too short!' });
                }
                let sender = req.body.sender.trim();
                if (sender.length < 1) {
                    return res.status(417).json({message: 'Sender Name is too short!' });
                }

                let groupId = req.body.group_id;
                if (isNaN(groupId)) {
                    return res.status(417).json({message: 'Group need to be an id(number)!' });
                }
                groupId = parseInt(groupId);
                let fromId = req.body.from_id;
                if (isNaN(fromId)) {
                    return res.status(417).json({message: 'From User need to be an id(number)!' });
                }
                fromId = parseInt(fromId);
                const now = new Date();
                const year = now.getFullYear();
                const month = (now.getMonth() + 1).toString().padStart(2, '0');
                const day = now.getDate().toString().padStart(2, '0');

                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');

                let sendDaate =  `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                try {
                    let newMsg = await ChatMessage.create({
                        group_id:  groupId,
                        from_id:   fromId,
                        sender:    sender,
                        msg:       msg,
                        send_time: sendDaate,
                    });
                    if (!newMsg) {
                        throw new Error("Failed to create new message");
                    }
                } catch (error) {
                    console.log('CHAT MESSAGES RESORCE CREATE NEW MESSAGE ERROR');
                    console.log(error);
                    return res.sendStatus(500);
                }
                return res.sendStatus(201);

            case 'UPDATE':
                if (!req.body.msg_id) {
                    return res.status(417).json({message: 'Missing required data!' });
                }
                let msgId = parseInt(req.body.msg_id);
                let updateM = await ChatMessage.find(msgId);
                if (!updateM) {
                    return res.status(404).json({message: 'Resource not find!' });
                }

                let updateData = {};

                if (req.body.group_id && !isNaN(req.body.group_id)) {
                    updateData.group_id = parseInt(req.body.group_id);
                }

                if (req.body.from_id && !isNaN(req.body.from_id)) {
                    updateData.from_id = parseInt(req.body.from_id);
                }

                if (req.body.sender && req.body.sender.trim().length > 0) {
                    updateData.sender = req.body.sender.trim();
                }

                if (req.body.msg && req.body.msg.trim().length > 0) {
                    updateData.msg = req.body.msg.trim();
                }

                let updateResult = await ChatMessage.updateById(msgId, updateData);
                if (updateResult) {
                    return res.sendStatus(202);
                } else {
                    return res.status(417).json({message: 'Fail to update chat message! ID: ' + msgId });
                }

            case 'DELETE':
                if (!req.body.delete_id) {
                    return res.status(417).json({message: 'Missing Message Id to delete!' });
                }
                let deleteId = parseInt(req.body.delete_id);
                let deleteResult = await ChatMessage.delete(deleteId);
                if (deleteResult) {
                    return res.sendStatus(200);
                } else {
                    return res.status(417).json({message: 'Failed to delete chat message! ID: ' + req.body.delete_id });
                }

            default:
                return res.status(417).json({message: 'Invalid Method! Method send: ' + req.body.method });
        }
    } catch (error) {
        console.log('CHAT MESSAGE RESORCE ADMIN RESOURCE UPDATE ERROR');
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = updateChatMessages;