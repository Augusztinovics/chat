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

    sendedFriendRequests() {
        return new Promise((resolve) => {
            let query = `f.id AS requestId,
                        f.to_user AS friendId,
                        f.message AS messageToFriend,
                        u.username AS friendName,
                        u.description AS friendDescription,
                        u.country AS friendCountry,
                        u.city AS friendCity,
                        u.profile_img AS friendImg
                        FROM friends f
                        LEFT JOIN users u ON f.to_user=u.id
                        WHERE from_user=${this.id}
                        AND accepted_at IS NULL
                        AND denided_at IS NULL`;
            Model.returnMany(query)
                .then((result) => {
                    resolve(result);
                });
        });
    }

    recivedFriendRequests() {
        return new Promise((resolve) => {
            let query = `f.id AS requestId,
                        f.from_user AS friendId,
                        f.message AS messageToFriend,
                        u.username AS friendName,
                        u.description AS friendDescription,
                        u.country AS friendCountry,
                        u.city AS friendCity,
                        u.profile_img AS friendImg
                        FROM friends f
                        LEFT JOIN users u ON f.from_user=u.id
                        WHERE to_user=${this.id}
                        AND accepted_at IS NULL
                        AND denided_at IS NULL`;
            Model.returnMany(query)
                .then((result) => {
                    resolve(result);
                });
        });
    }

}

module.exports = User;