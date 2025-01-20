const bcrypt = require('bcrypt');

async function updateUser(req, res) {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    if (req.body.description || req.body.description == '') {
        if (req.body.description == '') {
            req.user.description = null;
        } else {
            req.user.description = req.body.description.trim();
        }
    }

    if (req.body.lg) {
        req.user.lg = req.body.lg;
    }

    if (req.body.country || req.body.country == '') {
        if (req.body.country == '') {
            req.user.country = null;
        } else {
            req.user.country = req.body.country.trim();
        }
    }

    if (req.body.city || req.body.city == '') {
        if (req.body.city == '') {
            req.user.city = null;
        } else {
            req.user.city = req.body.city.trim();
        }
    }

    if (req.body.email || req.body.email == '') {
        if (req.body.email == '') {
            req.user.email = null;
        } else {
            req.user.email = req.body.email.trim();
        }
    }

    if (req.body.newPassword) {
        if (!req.body.oldPassword) {
            res.sendStatus(417);
            return;
        } else {
            let validPassword = await bcrypt.compare(req.body.oldPassword, req.user.password);
            if (!validPassword) {
                res.sendStatus(417);
                return;
            }
        }

        if (req.body.newPassword.trim().length < 6) {
            res.status(400).json({message:'password_lenth'});
            return;
        }

        if (req.body.newPassword.trim() == req.body.oldPassword.trim()) {
            res.status(400).json({message:'password_same'});
            return;
        }

        let hashedPassword = await bcrypt.hash(req.body.newPassword.trim(), 10);
        req.user.password = hashedPassword;
    }

    if (req.body.profileImg || req.body.profileImg == null) {
        req.user.profile_img = req.body.profileImg;
    }

    try {
        let result = await req.user.save();

        if (result) {
            res.json({
                userId: req.user.id,
                username: req.user.username,
                userEmail: req.user.email ?? '',
                userLg: req.user.lg ?? 'HU',
                userCountry: req.user.country ?? '',
                userCity: req.user.city ?? '',
                userDescription: req.user.description ?? '',
                userProfileImg: req.user.profile_img ?? null,
            });
        } else {
            res.status(400).json({message:'save'});
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

module.exports = updateUser;