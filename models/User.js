const { resolveComponent } = require('vue');
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
            let query = `f.id AS sendId,
                        f.to_user AS friendId,
                        f.message AS messageToFriend,
                        u.username AS friendName,
                        u.description AS friendDescription,
                        u.country AS friendCountry,
                        u.city AS friendCity,
                        u.profile_img AS friendImg
                        FROM friends f
                        LEFT JOIN users u ON f.to_user=u.id
                        WHERE f.from_user=${this.id}
                        AND f.accepted_at IS NULL
                        AND f.denided_at IS NULL`;
            Model.returnMany(query)
                .then((result) => {
                    resolve(result);
                });
        });
    }

    recivedFriendRequests() {
        return new Promise((resolve) => {
            let query = `f.id AS reqId,
                        f.from_user AS friendId,
                        f.message AS messageToFriend,
                        u.username AS friendName,
                        u.description AS friendDescription,
                        u.country AS friendCountry,
                        u.city AS friendCity,
                        u.profile_img AS friendImg
                        FROM friends f
                        LEFT JOIN users u ON f.from_user=u.id
                        WHERE f.to_user=${this.id}
                        AND f.accepted_at IS NULL
                        AND f.denided_at IS NULL`;
            Model.returnMany(query)
                .then((result) => {
                    resolve(result);
                });
        });
    }

    friends() {
        return new Promise((resolve) => {
            let query = `u.id AS friendId,
                        u.username AS friendName,
                        u.description AS friendDescription,
                        u.country AS friendCountry,
                        u.city AS friendCity,
                        u.profile_img AS friendImg
                        FROM friends f
                        LEFT JOIN users u ON IF(f.from_user==${this.id}, f.to_user=u.id, f.from_user=u.id)
                        WHERE IF(f.from_user==${this.id}, f.from_user=${this.id}, f.to_user=${this.id})
                        AND f.accepted_at IS NOT NULL
                        AND f.denided_at IS NULL`;
            Model.returnMany(query)
            .then((result) => {
                resolve(result);
            });
        });
    }

    searchFriend(nameText) {
        return new Promise((resolve) => {
            let searchText = nameText.trim() + '%';
            let query = `u.id AS friendId,
                        u.username AS friendName,
                        u.description AS friendDescription,
                        u.country AS friendCountry,
                        u.city AS friendCity,
                        u.profile_img AS friendImg,
                        r.id AS reqId,
                        r.accepted_at AS reqAcceptedDate,
                        s.id AS sendId,
                        s.accepted_at AS sendAcceptedDate,
                        s.message AS messageToFriend,
                        r.message AS messageFromFriend
                        FROM users u
                        LEFT JOIN friends r ON r.to_user=${this.id} AND r.from_user=u.id AND r.denided_at IS NULL
                        LEFT JOIN friends s ON s.from_user=${this.id} AND s.to_user=u.id AND s.denided_at IS NULL
                        WHERE u.id <> ${this.id}
                        AND u.username LIKE ?`;
            Model.returnMany(query, [searchText])
            .then((result) => {
                resolve(result);
            });
        });
    }

}

module.exports = User;