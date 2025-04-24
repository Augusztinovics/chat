const Model = require('./Model.js');
const GroupUsers = require('./GroupUser.js');
const User = require('./User.js');

class Group extends Model
{
    static table = 'groups';

    static columns = {
        id:          null,
        main_user:   null,
        group_name:  null,
        created_at:  null,
    };

    groupUsers() {
        return new Promise((resolve) => {
            this.users = [];
            GroupUsers.where(['group_id', this.id])
                .then((result) => {
                    result.forEach(u => {
                        this.users.push(u.user_id);
                    });
                    resolve(this);
                })
                .catch(() => {
                    resolve(this);
                })
        });
    }

}

module.exports = Group;