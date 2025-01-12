function logout(req, res) {
    let options = {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    };
    res.cookie('SessionId', '', options);
    res.redirect('/login');
}

module.exports = logout;