async function userSearch(req, res) {
    if (!req.user) {
        res.sendStatus(401);
    }

    let queryText = req.query.un;
    if (!queryText) {
        res.json({users: []});
        return;
    }

    queryText = queryText.trim();

    try {
        let result = await req.user.searchFriend(queryText);
        res.json({users: result});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = userSearch;