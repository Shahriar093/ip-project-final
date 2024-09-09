const express = require('express');
const User = require('../models/User');
const router = express.Router({ mergeParams: true });
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'cripto-ripon';

router.get('/', (req, res) => {
    res.render('loginform.ejs')
})
router.post('/', async (req, res) => {
    let { number, password } = req.body;
    let nUser = await User.findOne({ number: number });
    if (!nUser) {
        return res.send("User Not found, try with valid Credetials");
    }
    if (nUser.password === password) {
        const token = jwt.sign({ user: nUser.username, id: nUser._id }, SECRET_KEY, { expiresIn: '100h' });
        res.cookie('token', token);
        return res.redirect('/');
    }
    return res.send('Login Failed');
})

module.exports = router;