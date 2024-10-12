const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtSecret = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']

    try{
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1]

            jwt.verify(token, jwtSecret, (err, user) => {
                if (err) {
                    return res.status(403).send("Invalid or expiered token")
                }

                req.user = user;
                next()
            })
        }
        else{
            return res.status(401).send("Authorization header missing or malformed")
        }
    }
    catch(err) {
        console.error(err)
    }
}

module.exports = { verifyToken }