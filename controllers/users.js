const User = require("../models/user");

module.exports = {
    index,
    showProfile,
};

function showProfile(req, res) {
    
}

function index(req, res) {
    User.find({}).then((users) => {
        res.render('users/index', {
            user: req.user, user,
            title: 'Users Index'
        })
    })
}