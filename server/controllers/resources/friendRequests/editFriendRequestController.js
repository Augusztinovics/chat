const Friend = require('../../../../models/Friend.js');

async function editFriendRequest(req, res) {
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

    let message = req.body?.text ?? '';

    try {
        let frienRequest = await Friend.find(requestId);
        if (!frienRequest) {
            throw new Error("Failed to find friend request");
        }

        frienRequest.message = message;
        let saveResult = await frienRequest.save();

        if (saveResult) {
            let result = await req.user.sendedFriendRequests();
            res.json({sendedRequests: result});
        } else {
            throw new Error("Failed to update friend request");
        }
    } catch (error) {
        console.log('UPDATE FRIEND REQUEST CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = editFriendRequest;