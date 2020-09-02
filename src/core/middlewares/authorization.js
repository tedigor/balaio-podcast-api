const jwt = require('jsonwebtoken')

const User = require("../../models/User");

module.exports = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        res.status(401);
        return res.json();
    } else {
        try {
            jwt.verify(token.split(" ")[1], process.env.SECRET);
        } catch (e) {
            res.status(401);
            return res.json();
        }
    }
    next();
}
