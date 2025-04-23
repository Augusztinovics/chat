const Friend = require('../../../../models/Friend.js');
const Group = require('../../../../models/Group.js');
const GroupUser = require('../../../../models/GroupUser.js');

async function acceptFriendRequest(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    if (!req.body?.requestId) {
        res.sendStatus(400);
        return;
    }

    let requestId = parseInt(req.body.requestId);
    if (!requestId) {
        res.sendStatus(400);
        return;
    }

    try {
        let frienRequest = await Friend.find(requestId);
        if (!frienRequest) {
            throw new Error("Failed to find friend request");
        }

        frienRequest.accepted_at = Date.now();
        let saveResult = await frienRequest.save();

        if (saveResult) {
            let fromUser = await frienRequest.fromUser();
            if (!fromUser) {
                throw new Error("Failed to find from user");
            }
            let newGroup = await Group.create({
                main_user: req.user.id,
                group_name: fromUser.username,
            });
            if (!newGroup) {
                throw new Error("Failed to create group");
            }
            let mainGroupUser = await GroupUser.create({
                group_id: newGroup.id,
                user_id: req.user.id,
            });
            if (!mainGroupUser) {
                throw new Error("Failed to create main group user");
            }
            let friendGroupUser = await GroupUser.create({
                group_id: newGroup.id,
                user_id: fromUser.id,
            });
            if (!friendGroupUser) {
                throw new Error("Failed to create friend group user");
            }
            let result = await req.user.recivedFriendRequests();
            res.json({receivedRequests: result});
        } else {
            throw new Error("Failed to update friend request");
        }
    } catch (error) {
        console.log('ACCEPT FRIEND REQUEST CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = acceptFriendRequest;