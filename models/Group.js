const Model = require('./Model.js');

class Group extends Model
{
    static table = 'groups';

    static columns = {
        id:          null,
        main_user:   null,
        group_name:  null,
        created_at:  null,
    };

}

module.exports = Group;