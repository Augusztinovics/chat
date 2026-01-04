function adminUserData(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    if (!req.user.role) {
        res.sendStatus(401);
        return;
    }

    res.json({
        userId: req.user.id,
        username: req.user.username,
        roleId: req.user.role,
        hasUpdatePassword: req.user.has_update_psw,
        userProfileImg: req.user.profile_img ?? null,
    });
}

module.exports = adminUserData;