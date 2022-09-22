const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]

    try {
        const user = jwt.verify(token, "Leon")

        if (user) {
            req.body.user = user
            next()
        } else {
            res.status(500).send({ message: 'invalid or expired token' })
        }
    } catch (error) {
        console.log(error)
    }


}