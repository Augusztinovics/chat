const Model = require('./Model.js');

class Question extends Model
{
    static table = 'questions';

    static columns = {
        id:          null,
        user_id:     null,
        title:       null,
        question:    null,
        answer:      null,
        answered_at: null,
        created_at:  null,
    };

}

module.exports = Question;