const Group = require('../../../../models/Group.js');
const GroupUser = require('../../../../models/GroupUser.js');

async function createGroup(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    if (!req.body?.groupName) {
        res.sendStatus(400);
        return;
    }

    let newGroupName = req.body.groupName.trim();

    if (!newGroupName) {
        res.sendStatus(400);
        return;
    }

    if (!req.body?.friends) {
        res.sendStatus(400);
        return;
    }

    let friends = req.body.friends;
    if (friends.length < 1) {
        res.sendStatus(400);
        return;
    }

    try {
        let newGroup = await Group.create({
            main_user: req.user.id,
            group_name: newGroupName,
        });

        if (!newGroup) {
            throw new Error("Failed to create group");
        }

        let groupUsers = [];
        groupUsers.push(GroupUser.create({
            group_id: newGroup.id,
            user_id: req.user.id,
        }));

        friends.forEach(f => {
            groupUsers.push(GroupUser.create({
                group_id: newGroup.id,
                user_id: f,
            }));
        });

        Promise.all(groupUsers).then(() => {
            res.sendStatus(200);
            return;
        })
        .catch(() => {
            throw new Error("Failed to create group");
        });
    } catch (error) {
        console.log('CREATE GROUP CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = createGroup;