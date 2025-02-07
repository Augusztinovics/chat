async function getSendFriendRequest(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    try {
        let result = await req.user.sendedFriendRequests();
        res.json({sendedRequests: result});
    } catch (error) {
        console.log('GET SENDED FRIEND REQUEST CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = getSendFriendRequest;