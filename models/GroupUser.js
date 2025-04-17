const Model = require('./Model.js');

class GroupUser extends Model
{
    static table = 'group_users';

    static columns = {
        id:         null,
        group_id:   null,
        user_id:    null,
        created_at: null,
    };

}

module.exports = GroupUser;