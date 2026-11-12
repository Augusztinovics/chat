const ChatMessage = require('../../../../models/ChatMessage.js');

async function fetchChatMessages(req, res) {
    if (!req.user) {
        return res.sendStatus(401);
    }

    if (!req.user.role) {
        return res.sendStatus(401);
    }

    let set = req.query.s;
    if (!set) {
        set = 1;
    } else {
        set = parseInt(set);
    }

    let limit = req.query.l;
    if (!limit) {
        limit = 10;
    } else {
        limit = parseInt(limit);
    }
    let searchString = req.query.st;
    let searchKey = req.query.sk;
    const validSearckKeys = ['id', 'group_id', 'from_id', 'sender', 'msg'];
    const numericKeys = ['id', 'group_id', 'from_id'];
    if (!validSearckKeys.includes(searchKey)) {
        searchKey = null;
    }

    try {
        let result = [];
        let resultCount = 0;
        if (searchString && !isNaN(searchString) && searchKey && numericKeys.includes(searchKey)) {
            searchString = parseInt(searchString) ;
            result = await ChatMessage.whereRaw(`${searchKey} = ? ORDER BY id DESC LIMIT ? OFFSET ?`, [searchString, limit, ((set*limit)-limit)]);
            resultCount = await ChatMessage.countRaw(`WHERE ${searchKey} = ?`, [searchString]);
        } else if (searchString && searchString.length > 1 && searchKey) {
            searchString = '%' + searchString + '%';
            result = await ChatMessage.whereRaw(`${searchKey} LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`, [searchString, limit, ((set*limit)-limit)]);
            resultCount = await ChatMessage.countRaw(`WHERE ${searchKey} LIKE ?`, [searchString]);
        } else {
            result = await ChatMessage.whereRaw('id > 0 ORDER BY id DESC LIMIT ? OFFSET ?', [limit, ((set*limit)-limit)]);
            resultCount = await ChatMessage.countRaw();
        }
        res.json({chat_messages: result, result_count: resultCount});
    } catch (error) {
        console.log('FETCH CHAT MESSAGES CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = fetchChatMessages;