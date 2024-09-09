const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/User');
const Appointment = require('./models/Appointment');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const AprvdAppointment = require('./models/ApprovedAppointments');
const DoctorId = require('./models/doctorId');

const SECRET_KEY = 'cripto-ripon';

main = async () => await mongoose.connect('mongodb://127.0.0.1:27017/vetcare')

main().then(() => {
    console.log('DB Connected');
})
    .catch((err) => console.log(err.message));

const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                res.locals.authenticated = false;
            } else {
                res.locals.authenticated = true;
                res.locals.user = decoded.user;
                res.locals.id = decoded.id;
            }
            next();
        });
    } else {
        res.locals.authenticated = false;
        next();
    }
}

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(authenticate);


//home
app.get('/', (req, res) => {
    res.render('home.ejs');
})

//login, logout
app.use('/login', require('./routes/login'));
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/');
})
//signup
app.use('/signup', require('./routes/signup'));
//appointment
app.use('/appointment', require('./routes/appointment'));
//profile
app.get('/doctor', (req, res) => {
    res.render('doctor.ejs')
})
app.use('/customerprofile', require('./routes/customerprofile'));
app.get('/marketplace', (req, res) => {
    res.render('index.ejs');
})


app.listen(8080, () => {
    console.log(`http://localhost:8080`);
})