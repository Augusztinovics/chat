async function getReceivedFriendRequest(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    try {
        let result = await req.user.recivedFriendRequests();
        res.json({receivedRequests: result});
    } catch (error) {
        console.log('GET RECEIVED FRIEND REQUEST CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = getReceivedFriendRequest;