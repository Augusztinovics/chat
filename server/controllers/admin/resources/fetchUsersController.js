const User = require('../../../../models/User.js');

async function fetchUsers(req, res) {
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
    const validSearckKeys = ['id', 'username', 'email', 'lg', 'country', 'city', 'description', 'ip'];
    if (!validSearckKeys.includes(searchKey)) {
        searchKey = null;
    }

    try {
        let result = [];
        let resultCount = 0;
        if (searchString && !isNaN(searchString) && searchKey && searchKey == 'id') {
            searchString = parseInt(searchString) ;
            result = await User.whereRaw(`${searchKey} = ? ORDER BY id DESC LIMIT ? OFFSET ?`, [searchString, limit, ((set*limit)-limit)]);
            resultCount = await User.countRaw(`WHERE ${searchKey} = ?`, [searchString]);
        } else if (searchString && searchString.length > 1 && searchKey) {
            searchString = '%' + searchString + '%';
            result = await User.whereRaw(`${searchKey} LIKE ? OR email LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`, [searchString, searchString, limit, ((set*limit)-limit)]);
            resultCount = await User.countRaw(`WHERE ${searchKey} LIKE ? OR email LIKE ?`, [searchString, searchString]);
        } else {
            result = await User.whereRaw('id > 0 ORDER BY id DESC LIMIT ? OFFSET ?', [limit, ((set*limit)-limit)]);
            resultCount = await User.countRaw();
        }
        res.json({users: result, result_count: resultCount});
    } catch (error) {
        console.log('FETCH USERS CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = fetchUsers;