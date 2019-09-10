let users = require('../models/users');

let id = 1;

let register = (req, res) => {
    const {username, password} = req.body;

    users.push({
        id,
        username,
        password
    });
    id++;

    req.session.user.username = username;
    console.log(req.session.user)
    res.status(200).json(req.session.user);
}

let login = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        user => user.username === username && user.password === password
    );

    if (user) {
        req.session.user.username = user.username;
        res.status(200).json(req.session.user);
    } else {
        res.status(500).json("Unauthorized.");
    }
}

let signOut = (req, res) => {
    req.session.destroy();
    res.status(200).json(req.session);
}

let getUser = (req, res) => {
    console.log(req.session.user)
    res.status(200).json(req.session.user);
}

module.exports = {
    register,
    login,
    signOut,
    getUser
}