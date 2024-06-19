const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../schemas/users')
const bcrypt = require('bcrypt');
const setRounds = 10;
require('dotenv').config();
const authMiddleware = require('../middlewares/auth-middleware')

// Signup API - POST
router.post('/signup', async (req, res, next) => {

    console.log(" Signup API")
    try {
        const { userId, email, password, confirmPassword } = req.body
        const existsUsers = await User.findOne({ userId })

        // Staring with english   6 to 20 of length
        const regUserIdExp = /^[a-zA-z]+[a-zA-z0-9]{5,19}$/g
        const regUserPasswordExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

        if (userId.search(regUserIdExp) == -1) {
            return res.status(401).send({
                errorMessage: 'ID format is not correct.',
            })
        } else if (password.search(regUserPasswordExp) == -1) {
            return res.status(401).send({
                errorMessage: 'password format is not correct.',
            })
        } else { }
        const salt = bcrypt.genSaltSync(setRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = new User({ userId, password: hashedPassword })
        await user.save()
        res.status(201).send({ isCreated: true })
    } catch (err) {
        next(err)
        console.log(err.errorMessage)
        res.status(401).send({ isCreated: false })
    }
})

//Login API - POST
router.post('/signIn', async (req, res) => {
    try {
        const { userId, password } = req.body
        const user = await User.findOne({ userId })
        if (!user) {
            res.status(400).send({
                sucess: false,
                errorMessage: 'userId or  password is wrong.',
            })

        } else {
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(401).send({
                    success: false,
                    msg: 'nickname or password is wrong.',
                });
            }
            //console.log("Test")
            const user_id = user['userId'];
            const token = jwt.sign(user_id, process.env.SECRET_KEY);
            res.status(201).send({
                sucess: true,
                token,
                user_id,
                msg: "Successful login"
            })
        }
    } catch (err) {

        console.log('login  API error: ', err);
        res
            .status(500).send({
                sucess: false,
                errorMessage: 'unexpected error.',
            })
    }
})


// router.get("/me", authMiddleware, async (req, res) => {
//     const { user } = res.locals;
//     res.send({
//       user,
//     });
// });

router.get("/me", authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.send({
        user: {
            id: user.userId
        },
    });
});

// router.post('/login', async (req, res) => {
//     console.log(" login API")
//     res.status(200).json({ "isCreated": true })
// });

// router.post('/signup', async (req, res) => {
//     console.log(" signup API")

//     const { email, name, institute } = req.body
//     const isExist = await User.findOne({ email: email })
//     if (isExist) {

//         return res.status(400).send("email already registered")
//     } else {

//         await User.create({ name, email, password, institute })
//         return res.status(201).send(" signup successful ")
//     }
// });

module.exports = router