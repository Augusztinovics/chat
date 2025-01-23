const Model = require('./Model.js');

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

}

module.exports = Friend;