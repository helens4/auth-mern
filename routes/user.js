const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')

router.get('/get-user-info', authMiddleware, async (req, res) => {
    try {
        res.send({ success: true, data: req.body.user })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router