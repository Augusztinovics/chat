const Group = require('../../../../models/Group.js');

async function getFriends(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    try {
        let result = await req.user.friends();
        let groupIds = await req.user.groupIds();
        let groups = [];
        groupIds.forEach(g => {
            groups.push(Group.find(g.group_id));
        });
        Promise.all(groups).then((r) => {
            let fullGroups = [];
            r.forEach(g => {
                fullGroups.push(g.groupUsers());
            });
            Promise.all(fullGroups).then(gu => {
                res.json({friends: result, groups: gu});
            })
        })
    } catch (error) {
        console.log('GET FRIENDS CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = getFriends;