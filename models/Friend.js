const Model = require('./Model.js');
const User = require('./User.js');

class Friend extends Model
{
    static table = 'friends';

    static columns = {
        id:          null,
        from_user:   null,
        to_user:     null,
        message:     null,
        accepted_at: null,
        denided_at:  null,
        created_at:  null,
    };

    fromUser() {
        return new Promise((resolve) => {
            User.find(this.from_user)
                .then((result) => {
                    resolve(result);
                })
                .catch(() => {
                    resolve(false);
                })
        });
    }

    toUser() {
        return new Promise((resolve) => {
            User.find(this.to_user)
                .then((result) => {
                    resolve(result);
                })
                .catch(() => {
                    resolve(false);
                })
        });
    }

}

module.exports = Friend;