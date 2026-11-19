const Question = require('../../../models/Question.js');

async function deleteQuestion(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    if (!req.body?.delete_id) {
        res.sendStatus(400);
        return;
    }

    let deleteId = parseInt(req.body.delete_id);

    try {
        let oldQuestion = await Question.find(deleteId);

        if (!oldQuestion || oldQuestion?.user_id !== req.user.id) {
            res.sendStatus(400);
            return;
        }

        let deleteResult = await Question.delete(deleteId);
        if (!deleteResult) {
            throw new Error("Failed to delete question");
        }

        res.sendStatus(200);
        return 
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = deleteQuestion;