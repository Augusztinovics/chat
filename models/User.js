const Model = require('./Model.js');

class User extends Model
{
    static table = 'users';

    static columns = {
        id:             null,
        username:       null,
        password:       null,
        email:          null,
        lg:             null,
        country:        null,
        city:           null,
        description:    null,
        profile_img:    null,
        ip:             null,
        device_data:    null,
        remember_token: null,
        push_token:     null,
        created_at:     null,
    };

}

module.exports = User;