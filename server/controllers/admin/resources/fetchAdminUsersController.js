const AdminUser = require('../../../../models/AdminUser.js');

async function fetchAdminUsers(req, res) {
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
        if (searchString && !isNaN(searchString)) {
            searchString = parseInt(searchString) ;
            result = await AdminUser.whereRaw('role_id = ? ORDER BY id DESC LIMIT ? OFFSET ?', [searchString, limit, ((set*limit)-limit)]);
            resultCount = await AdminUser.countRaw('WHERE role_id = ?', [searchString]);
         } else {
            result = await AdminUser.whereRaw('id > 0 ORDER BY id DESC LIMIT ? OFFSET ?', [limit, ((set*limit)-limit)]);
            resultCount = await AdminUser.countRaw();
        }
        res.json({admin_users: result, result_count: resultCount});
    } catch (error) {
        console.log('FETCH ADMIN USERS CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = fetchAdminUsers;