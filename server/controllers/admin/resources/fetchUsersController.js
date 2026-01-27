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

    try {
        let result = [];
        let resultCount = 0;
        if (searchString && searchString.length > 2) {
            searchString = '%' + searchString + '%';
            result = await User.whereRaw('username LIKE ? OR email LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?', [searchString, searchString, limit, ((set*limit)-limit)]);
            resultCount = await User.countRaw('WHERE username LIKE ? OR email LIKE ?', [searchString, searchString]);
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