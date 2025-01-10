require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * user should be an existing user model
 * expire the time, default 8h
 * 
 * @param {User} user 
 * @param {string} expire 
 * @returns boolean|string
 */
function generateToken(user, expire='8h') {
    if (typeof user !== 'object') {
        return false;
    }
    if (!user.id || !user.username) {
        return false;
    }
    let token = process.env.JWT_TOKEN;
    if (!token) {
        return false;
    }
    return jwt.sign({id: user.id, username: user.username}, token, {expiresIn: expire,})
}

module.exports = generateToken;