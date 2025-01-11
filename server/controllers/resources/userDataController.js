function userData(req, res) {
    if (!req.user) {
        res.sendStatus(401);
    }

    res.json({
        userId: req.user.id,
        username: req.user.username,
        userEmail: req.user.emal ?? '',
        userLg: req.user.lg ?? 'HU',
        userCountry: req.user.country ?? '',
        userCity: req.user.city ?? '',
        userDescription: req.user.description ?? '',
        userProfileImg: req.user.profile_img ?? null,
    });
}

module.exports = userData;