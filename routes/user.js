
var express = require('express')
var mongoose = require('mongoose')

var User = require('../models/user')

var router = express.Router()

/*
  to add user only provide (name, email, referredUser) in req.body
  referredUser can be userId or null
*/
router.post('/user/add', async function (req, res) {

    const { name, email, referredUser } = req.body

    var newUser = new User({
        name,
        email,
        referredUser,
        isPaymentMade: false,
        totalEarnings: 0
    })

    await newUser.save()
        .then(() => res.json('user created'))
        .catch(err => res.status(401).json("An error occured try again"))
})

router.post('/user/payment', async function (req, res) {

    const { userId } = req.body

    try {
        await User.findOneAndUpdate(
            { _id: userId },
            {
                isPaymentMade: true
            },
            { new: true },
            function (err, user) {
                if (err) return res.status(401).json("Error occured")

                User.findById(user.referredUser)
                    .exec((err, refUser) => {
                        if (err) return res.status(400).json(err)
                        refUser.totalEarnings += 10
                        return res.status(200).send('Payment done! referred user rewarded with rs 10')
                    })
            })

    } catch (err) {
        console.log(err)
    }

})


module.exports = router
