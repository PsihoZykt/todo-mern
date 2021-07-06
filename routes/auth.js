const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {Router} = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = Router()
router.post('/register',
    async (req, res) => {

        try {
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: "User is already exists"})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            await user.save();
            res.status(201).json({message: 'User created'})
        } catch (e) {
            res.status(500).json({message: "Somethings goes wrong"})
        }
    })
router.post(
    '/login',
    async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({ message: 'User is not found' })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Wrong password, try again'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Something goes wrong'})
        }
    }
)
module.exports = router