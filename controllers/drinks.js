const User = require("../models/user");
const Drink = require("../models/drink");
const axios = require("axios")

module.exports = {
    index,
    new: newDrink,
    create,
    show,
    delete: delDrink,
    update,
    search,
    createReview,
    addToMyBooze,
    delFromMyBooze,
    edit,
    escapeRegex
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

function delFromMyBooze(req, res) {
    let idx = req.user.drinks.indexOf(req.params.drinkId)
    req.user.drinks.splice(idx, 1)
    req.user.save(err => {
        res.redirect(`/drinks/${req.params.drinkId}`)
    })
}

function addToMyBooze(req, res) {
    User.findById(req.user._id, function (err, user) {
        user.drinks.push(req.params.drinkId)
        user.save(function (err) {
            if (err) console.log(err);
            res.redirect(`/drinks/${req.params.drinkId}`)
        })
    })
}

function createReview(req, res) {
    req.body.postedBy = req.user._id
    Drink.findById(req.params.id)
        .then((drink) => {
            drink.reviews.push(req.body)
            drink.save()
                .then(() => {
                    res.redirect(`/drinks/${drink._id}`)
                })
        })
}

function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function search(req, res) {
    const regex = new RegExp(escapeRegex(req.body.search), 'gi')
    Drink.find({ 'drink': regex })
        .then((drink) => {
            console.log(drink)
            res.render('drinks/search', {
                title: 'Search Result',
                user: req.user,
                drink
            })
        })
}

function update(req, res) {
    Drink.findByIdAndUpdate(req.params.id, req.body, function (err, drink) {
        res.redirect(`/drinks/${drink._id}`)
    });
}

function delDrink(req, res, next) {
    Drink.findByIdAndDelete(req.params.id, err => {
        res.redirect('/users/myBooze')
    })
}

function show(req, res) {
    console.log(req.params.id) //GET ALL INFO
    Drink.findById(req.params.id)
        .populate({ path: 'reviews.postedBy', model: 'User' })
        .populate({ path: 'postedBy', model: 'User' })
        .then((drink) => {
            res.render('drinks/show', {
                user: req.user,
                title: 'Drink details',
                drink
            })
        })
        .catch(err => console.log(err))
}

function create(req, res) {
    const drink = new Drink(req.body);
    drink.save(function (err) {
        if (err) {
            console.log(err);
            return res.render('drinks/new', {
                user: req.user,
                title: 'Add Drink'
            })
        }
        res.redirect(`/drinks/${drink._id}`)
    })
}

function newDrink(req, res) {
    res.render('drinks/new', {
        user: req.user,
        title: 'New Drink',

    })
}

function index(req, res) {
    Drink.find({})
        .then((drinks) => {
            res.render("drinks/index", {
                title: "All Drinks",
                user: req.user,
                drinks
            })
        })
}