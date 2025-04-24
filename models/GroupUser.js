const Model = require('./Model.js');
const User = require('./User.js');
const Group = require('./Group.js');

class GroupUser extends Model
{
    static table = 'group_users';

    static columns = {
        id:         null,
        group_id:   null,
        user_id:    null,
        created_at: null,
    };

    user() {
        return new Promise((resolve) => {
            User.find(this.user_id)
                .then((result) => {
                    resolve(result);
                })
                .catch(() => {
                    resolve(false);
                })
        });
    }

    group() {
        return new Promise((resolve) => {
            Group.find(this.group_id)
                .then((result) => {
                    resolve(result);
                })
                .catch(() => {
                    resolve(false);
                })
        });
    }

}

module.exports = GroupUser;