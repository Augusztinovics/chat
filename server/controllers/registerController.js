function registerController(req, res) {
    let hpot = req?.body?.hpot;
    if (hpot) {
        res.status(400).json({message:'pot'});
        return;
    }
    if (!req.body.username) {
        res.status(400).json({message:'username'});
        return;
    }
    if (!req.body.password) {
        res.status(400).json({message:'password'});
        return;
    }
    if (!req.body.acceptTerms) {
        res.status(400).json({message:'terms'});
        return;
    }
    let username = req.body.username;
    username = username.trim();
    let password = req.body.password;
    password = password.trim();

    setTimeout(() => {
        //Check the username, if not in use
        //Save the new user to database, then login the user
        //If username in use, return error code 417 (with message: invalid_username)
        res.json({message:'ok'});
    }, 300);
}

module.exports = registerController;
