const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { init, insertAchievement, createUser } = require('./db')

const PORT = 8080

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', () => {
    res.render('login')
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req)
    if (email === 'admin' && password === 'pass') {
        console.log('correct ✅')
        res.redirect('/add');
    } else {
        res.redirect('/');
    }
});

app.get('/reveal', (req, res) => {
    res.render('viewpage')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    user_data = {
        'email': req.body.email,
        'password': req.body.password,
        'secret': req.body.secret,
        'date_added': new Date(),
    }
    createUser(user).then(() => {
        res.redirect('/')
    })
    res.redirect('register')
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/add', (req, res) => {
    console.log("res!", req.body.achievement)
    achievement_data = {
        'achievement': req.body.achievement,
        'date_added': new Date(),
        'user': 'utsav'
    }
    console.log(achievement_data)
    insertAchievement(achievement_data).then(() => {
        res.render('thankyou')
    })
})

init().then(() => {
    app.listen(PORT, () => {
        console.log(`Example app listening on PORT ${PORT}`)
    })
})
