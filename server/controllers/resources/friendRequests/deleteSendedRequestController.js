const Friend = require('../../../../models/Friend.js');

async function deleteFriendRequest(req, res) {
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
        await Friend.delete(requestId);

        let result = await req.user.sendedFriendRequests();
        res.json({sendedRequests: result});
    } catch (error) {
        console.log('DELETE FRIEND REQUEST CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = deleteFriendRequest;