async function getFriends(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    try {
        let result = await req.user.friends();
        console.log(result);
        res.json({friends: result});
    } catch (error) {
        console.log('GET FRIENDS CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = getFriends;