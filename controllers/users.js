const User = require("../models/user");
const Drink = require("../models/drink");

module.exports = {
    index,
    showMyBooze,
    delFromMyBooze,
    update,
    edit
};

function edit(req, res) {
    Drink.findById(req.params.id)
        .then(drink => {
            res.render('drinks/edit', {
                title: 'Edit drink',
                user: req.user,
                drink
            })
        })
}

function update(req, res) {
    console.log('REQ???', req.params.id)
    Drink.findByIdAndUpdate(req.params.id, req.body, function (err, drink) {
        res.redirect(`/drinks/${drink._id}`)
    });
}

function delFromMyBooze(req, res) {
    let idx = req.user.drinks.indexOf(req.params.drinkId)
    req.user.drinks.splice(idx, 1)
    req.user.save(err => {
        res.redirect(`/users/mybooze`)
    })
}

function showMyBooze(req, res) {
    Drink.find({ postedBy: req.user._id })
        .then((drinks) => {
            User.findById(req.user._id)
                .populate("drinks").exec()
                .then((user) => {
                    res.render("users/mybooze", {
                        user,
                        title: "Profile Page",
                        drinks
                    });
                });

        })
}

function index(req, res) {
    User.find({}).then((users) => {
        res.render('users/index', {
            user: req.user, user,
            title: 'Users Index'
        })
    })
}