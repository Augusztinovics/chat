const GroupUser = require('../../../../models/GroupUser.js');

async function fetchGroupUsers(req, res) {
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
    const validSearckKeys = ['id', 'group_id', 'user_id'];
    if (!validSearckKeys.includes(searchKey)) {
        searchKey = null;
    }

    try {
        let result = [];
        let resultCount = 0;
        if (searchString && !isNaN(searchString) && searchKey) {
            searchString = parseInt(searchString) ;
            result = await GroupUser.whereRaw(`${searchKey} = ? ORDER BY id DESC LIMIT ? OFFSET ?`, [searchString, limit, ((set*limit)-limit)]);
            resultCount = await GroupUser.countRaw(`WHERE ${searchKey} = ?`, [searchString]);
         } else {
            result = await GroupUser.whereRaw('id > 0 ORDER BY id DESC LIMIT ? OFFSET ?', [limit, ((set*limit)-limit)]);
            resultCount = await GroupUser.countRaw();
        }
        res.json({group_users: result, result_count: resultCount});
    } catch (error) {
        console.log('FETCH GRUPS CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = fetchGroupUsers;