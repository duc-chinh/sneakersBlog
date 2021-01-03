const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'm2miage', resave: false, saveUninitialized: false }));

const db = require('./app/models');
const User = require('./app/models/user.model');
const { request } = require('express');
db.mongoose
    .connect(db.url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() =>
    {
        console.log('Connected to DB!');
    })
    .catch(err =>
        {
            console.log('Error connecting to DB!', err);
            process.exit();
        });

app.get('/', (req, res) =>
{
    res.json({ message: 'Entered into Sneakers News.' });
});

require('./app/routes/article.routes')(app);

app.post('/login', (req, res) =>
{
    User.findOne({ login: req.body.login, password: req.body.password }, (err, user) =>
    {
        if(err)
            return res.status(401).json({ message: 'error' });
        if(!user)
            return res.status(401).json({ message: 'wrong login' });
        req.session.userId = user.id;
        res.status(200).json({ login: user.login, firstName: user.firstName, lastName: user.lastName });
    });
});

app.post('/register', (req, res) =>
{
    console.log(req.body);
    var newUser = new User(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            login: req.body.login,
            password: req.body.password
        }
    );

    User.countDocuments({ login: newUser.login }, function(err, count)
    {
        if(err)
            return res.status(401).json({ message: 'error' });
        else if(count > 0)
            return res.status(400).json({ message: 'login already exists' });
        else
        {
            newUser.save((err, user) =>
            {
                if(err)
                    return console.error(err);
                req.session.userId = user.id;
                res.status(200).json({ firstName: user.firstName, lastName: user.lastName, login: user.login });
            });
        }
    });
});

app.get('/logout', (req, res) =>
{
    req.session.destroy(err =>
        {
            if(err)
                return res.status(409).json({ message: 'error '});
            res.status(200).json({ message: 'logged out' });
        });
});

app.get('/islogged', (req, res) =>
{
    if(!req.session.userId)
        return res.status(401).json();
    
        User.findOne(req.session.userId, (err, user) =>
        {
            if(err || !user)
                return res.status(401).json({ message: 'error' });
            req.session.userId = user.id;
            res.status(200).json({ firstName: user.firstName, lastName: user.lastName, login: user.login });
        });
});

app.listen(3000, () =>
{
    console.log('Server listening on port 3000.');
});
