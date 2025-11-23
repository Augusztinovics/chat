const Group = require('../../../../models/Group.js');
const GroupUser = require('../../../../models/GroupUser.js');

async function updateGroup(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    if (!req.body?.groupId) {
        res.sendStatus(400);
        return;
    }

    let updatedGroupName = req.body?.groupName ? req.body.groupName.trim() : null;
    let removeFriendIds = req.body?.removeIds ?? [];
    let addFriendIds = req.body?.addIds ?? [];
    let deleteGroup = req.body?.del ?? false;

    if (!deleteGroup) {
        if (!updatedGroupName && removeFriendIds.length < 1 && addFriendIds.length < 1) {
            res.sendStatus(400);
            return;
        }
    }

    let group = null;
    try {
        group = await Group.find(req.body.groupId);

        if (!group || group?.main_user != req.user.id) {
            throw new Error("Failed to find group");
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(403);
        return;
    }

    try {
        if (deleteGroup) {
            let groupUsersDelete = await GroupUser.deleteRaw('group_id=?', [group.id]);
            if (!groupUsersDelete) {
                throw new Error("Failed to delete group users");
            }
            let deletion = await Group.delete(group.id);
            if (deletion) {
                res.sendStatus(200);
                return;
            } else {
                throw new Error("Failed to delete group");
            }
        } else {
            if (updatedGroupName) {
                group.group_name = updatedGroupName;
                let result = await group.save();
                if (!result) {
                    throw new Error("Failed to update group name");
                }
            }
            if (removeFriendIds.length > 0 || addFriendIds.length > 0) {
                let groupUsersUpdate = [];
                if (removeFriendIds.length > 0) {
                    removeFriendIds.forEach(df => {
                        groupUsersUpdate.push(GroupUser.deleteRaw('group_id=? AND user_id=?', [group.id, df]));
                    })
                }
                if (addFriendIds.length > 0) {
                    addFriendIds.forEach(f => {
                        groupUsersUpdate.push(GroupUser.create({
                            group_id: group.id,
                            user_id: f,
                        }));
                    });
                }
                Promise.all(groupUsersUpdate).then(() => {
                    res.sendStatus(200);
                    return;
                })
                .catch(() => {
                    throw new Error("Failed to update group");
                });
            } else {
                res.sendStatus(200);
            }
        }
    } catch (error) {
        console.log('UPDATE GROUP CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = updateGroup;