const ChatMessage = require('../../../models/ChatMessage.js');

async function getMoreMessage(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    let groupId = req.query.gi;
    if (!groupId) {
        res.json({messages: []});
        return;
    }

    let offset = req.query.s ?? 1;

    try {
        let result = await ChatMessage.getMsgSet(groupId, offset);
        res.json({messages: result.reverse()});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = getMoreMessage;