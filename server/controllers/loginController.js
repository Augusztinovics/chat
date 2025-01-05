function loginController(req, res) {
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

    let username = req.body.username;
    username = username.trim();
    let password = req.body.password;
    password = password.trim();

    setTimeout(() => {
        //Check user if exists, and the data correct, if yes login the user, else return an error code(417)
        res.json({message:'ok'});
    }, 300);
}

module.exports = loginController;
