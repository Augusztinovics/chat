const Group = require('../../../../models/Group.js');
const ChatMessage = require('../../../../models/ChatMessage.js');

async function getFriends(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    try {
        let result = await req.user.friends();
        let groupIds = await req.user.groupIds();
        let messages = [];
        let groups = [];
        groupIds.forEach(g => {
            groups.push(Group.find(g.group_id));
            messages.push(ChatMessage.getMsgSet(g.group_id, 1));
        });
        Promise.all(groups).then((r) => {
            let fullGroups = [];
            r.forEach(g => {
                fullGroups.push(g.groupUsers());
            });
            Promise.all(fullGroups).then(gu => {
                Promise.all(messages).then(m => {
                    let fullMessages = {};
                    m.forEach(msg => {
                        if (msg.length > 0) {
                            fullMessages[msg[0].group_id] = msg.reverse();
                        }
                    });
                    res.json({friends: result, groups: gu, messages: fullMessages});
                });
            })
        })
    } catch (error) {
        console.log('GET FRIENDS CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = getFriends;