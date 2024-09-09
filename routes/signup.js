const express = require('express');
const User = require('../models/User');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    // res.render('signupform.ejs');
    res.render('signupform.ejs')
})
router.post('/',async (req, res) => {
    console.log(req.body);
    let { username, number, password } = req.body;
    let newUser = new User({
        username, number, password
    })
    await newUser.save();
    res.send('after signup');
} )

module.exports = router;