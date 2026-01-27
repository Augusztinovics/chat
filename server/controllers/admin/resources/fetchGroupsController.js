const Group = require('../../../../models/Group.js');

async function fetchGroups(req, res) {
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
            result = await Group.whereRaw('main_user = ? ORDER BY id DESC LIMIT ? OFFSET ?', [searchString, limit, ((set*limit)-limit)]);
            resultCount = await Group.countRaw('WHERE main_user = ?', [searchString]);
        } else if (searchString && searchString.length > 2) {
            searchString = '%' + searchString + '%';
            result = await Group.whereRaw('group_name LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?', [searchString, limit, ((set*limit)-limit)]);
            resultCount = await Group.countRaw('WHERE group_name LIKE ?', [searchString]);
        } else {
            result = await Group.whereRaw('id > 0 ORDER BY id DESC LIMIT ? OFFSET ?', [limit, ((set*limit)-limit)]);
            resultCount = await Group.countRaw();
        }
        res.json({groups: result, result_count: resultCount});
    } catch (error) {
        console.log('FETCH GRUPS CATCH ERROR');
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = fetchGroups;