const Model = require('./Model.js');
const User = require('./User.js');

class AdminUser extends Model
{
    static table = 'admin_users';

    static columns = {
        id:              null,
        user_id:         null,
        role_id:         null,
        update_password: null,
        created_at:      null,
    };

    // TODO - constantly check and change if nessesary!
    // User Roles:
    // 1 Admin:       VIEW:   anything,
    //                UPDATE: answer user quesstions
    //                        disable user
    // 2 Super Admin: VIEW:   anything,
    //                UPDATE: anything

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
}

module.exports = AdminUser;