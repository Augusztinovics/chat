require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../../models/User.js');

/**
 * check if the given token is valid, and return user if yes false if no
 * 
 * @param {string} token 
 * @returns boolean|User
 */
function checkToken(token) {
    return new Promise((resolve) => {
        let jwtToken = process.env.JWT_TOKEN;
        if (!jwtToken) {
            resolve(false);
        }

        jwt.verify(token, jwtToken, async (err, decoded) => {
            if (err) {
                resolve(false);
            } else {
                let {id, username} = decoded;
                let user = await User.where([['id', id],['username', username]], 'first');
                if (user) {
                    resolve(user);
                } else {
                    resolve(false);
                }
            }
        });
    })
}

module.exports = checkToken;