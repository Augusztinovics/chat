const Question = require('../../../models/Question.js');

async function getQuestions(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    try {
        let result = await Question.whereRaw('user_id = ? ORDER BY id DESC', [req.user.id]);
        res.json({contact_us_requests: result});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = getQuestions;