const Friend = require('../../../../models/Friend.js');

async function fetchFriends(req, res) {
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
    const validSearckKeys = ['id', 'from_user', 'to_user', 'message'];
    const numericKeys = ['id', 'from_user', 'to_user'];
    if (!validSearckKeys.includes(searchKey)) {
        searchKey = null;
    }

    try {
        let result = [];
        let resultCount = 0;
        if (searchString && !isNaN(searchString) && searchKey && numericKeys.includes(searchKey)) {
            searchString = parseInt(searchString) ;
            result = await Friend.whereRaw(`${searchKey} = ? ORDER BY id DESC LIMIT ? OFFSET ?`, [searchString, limit, ((set*limit)-limit)]);
            resultCount = await Friend.countRaw(`WHERE ${searchKey} = ?`, [searchString]);
        } else if (searchString && searchString.length > 1 && searchKey) {
            searchString = '%' + searchString + '%';
            result = await Friend.whereRaw(`${searchKey} LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`, [searchString, limit, ((set*limit)-limit)]);
            resultCount = await Friend.countRaw(`WHERE ${searchKey} LIKE ?`, [searchString]);
        }else {
            result = await Friend.whereRaw('id > 0 ORDER BY id DESC LIMIT ? OFFSET ?', [limit, ((set*limit)-limit)]);
            resultCount = await Friend.countRaw();
        }
        res.json({friends: result, result_count: resultCount});
    } catch (error) {
        console.log('FETCH FRIENDS CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = fetchFriends;