const Friend = require('../../../../models/Friend.js');

async function sendFriendRequest(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    if (!req.body?.friendId) {
        res.sendStatus(400);
        return;
    }

    let toId = parseInt(req.body.friendId);
    if (!toId) {
        res.sendStatus(400);
        return;
    }

    let message = req.body?.text ?? '';
    try {
        let newRequest = await Friend.create({
            from_user: req.user.id,
            to_user: toId,
            message: message,
        });

        if (!newRequest) {
            throw new Error("Failed to create friend request");
        }

        let result = await req.user.sendedFriendRequests();
        res.json({sendedRequests: result});
    } catch (error) {
        console.log('SEND FRIEND REQUEST CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = sendFriendRequest;