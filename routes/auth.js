const express = require('express')
const router = express.Router()
const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const sendEmail = require('../utils/sendEmail')
const Token = require('../models/tokenModel')

router.post('/register', async (req, res) => {

    try {
        const existingUser = await Users.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).send({ success: false, message: 'User already exists' })
        }

        const password = req.body.password
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)

        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword

        const newUser = new Users(req.body)
        const result = await newUser.save()
        await sendEmail(result, 'verify-email')


        res.status(200).send({ success: true, message: 'User Registered Successfully' })

    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (user) {

            const passwordMatched = await bcrypt.compare(req.body.password, user.password)
            if (passwordMatched) {

                if (user.isVerified) {

                    const dataToFrontEnd = {
                        _id: user._id,
                        email: user.email,
                        name: user.name
                    }

                    const token = jwt.sign(dataToFrontEnd, "Leon", { expiresIn: 60 * 60 })
                    res.status(200).send({ success: true, message: 'User Login Successfull', data: token })
                } else {
                    res.status(200).send({ success: false, message: 'Email not verified', data: null })
                }
            } else {
                res.status(200).send({ success: false, message: 'Incorrect password', data: null })
            }
        } else {
            res.send({ success: false, message: 'User does not exists', data: null })
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/verify-email', async (req, res) => {

    try {

        const tokenData = await Token.findOne({ token: req.body.token })
        if (tokenData) {
            await Users.findOneAndUpdate({ _id: tokenData.userId, isVerified: true })
            await Token.findOneAndDelete({ token: req.body.token })
            res.send({ success: true, message: "email verified successfully" })
        } else {
            res.send({ success: false, message: 'Invalid token' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

router.post('/send-reset-password-link', async (req, res) => {
    try {
        const result = await Users.findOne({ email: req.body.email })
        await sendEmail(result, "forgot-password")
        res.send({ success: true, message: "pswd reset link send" })
    } catch (error) {
        res.status(500).send(error)
    }
})

//reset-password

router.post('/forgot-password', async (req, res) => {

    try {
        const tokenData = await Token.findOne({ token: req.body.token })
        if (tokenData) {
            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            await Users.findOneAndUpdate({ _id: tokenData.userId, password: hashedPassword })
            await Token.findOneAndDelete({ token: req.body.token })
            res.send({ success: true, message: "password reset successfully" })
        } else {
            res.send({ success: false, message: 'Invalid token' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})




module.exports = router