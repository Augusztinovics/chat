const Question = require('../../../models/Question.js');

async function createQuestion(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    if (!req.body?.title || !req.body?.question) {
        res.sendStatus(400);
        return;
    }

    let title = req.body.title.trim();
    let question = req.body.question.trim();

    if (!title || !question || title.length < 2 || question.length < 2) {
        res.sendStatus(400);
        return;
    }

    try {
        let newQuestion = await Question.create({
            user_id: req.user.id,
            title: title,
            question: question
        });

        if (!newQuestion) {
            throw new Error("Failed to create question");
        }

        res.sendStatus(201);
        return 
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = createQuestion;