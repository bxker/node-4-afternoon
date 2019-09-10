const express = require('express');
const session = require('express-session');
require('dotenv').config();
const {SERVER_PORT, SESSION_SECRET} = process.env;
const {checkForSession} = require('./middlewares/checkForSession');
const {read} = require('./controllers/swagController');
const {register, login, signOut, getUser} = require('./controllers/authController');
const {add, deleteItem, checkout} = require('./controllers/cartController');
const {search} = require('./controllers/searchController');

const app = express ();

//middleware
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

//endpoints
//swag
app.get('/api/swag', read);
//auth
app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signOut);
app.get('/api/user', getUser);
//cart
app.post('/api/cart/checkout', checkout);
app.post('/api/cart/:id', add);
app.delete('/api/cart/:id', deleteItem);
//search
app.get('/api/search', search);



app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`));