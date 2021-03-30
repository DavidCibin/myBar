const User = require("../models/user");
const Drink = require("../models/drink");

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
    delFromMyBooze

};


function delFromMyBooze(req, res, next) {
    User.findById(req.user._id, function (err, user) {
        Drink.findByIdAndDelete(req.params.id, err => {
            if (err) console.log(err);
            res.redirect(`/drinks/${req.params.drinkId}`)
        })
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

// function addToMyBooze(req, res) {
//     req.body.postedBy = req.user._id
//     Drink.findbyID(req.params.id)
//         .then((drink) => {
//             // game is in the database already (someone has already collected it)
//             if (drink) {
//                 drink.postedBy.push(req.user._id)
//                 drink.save()
//                     .then(() => {
//                         res.redirect(`/drinks/${req.params.id}`)
//                     })
//                     .catch(err => console.log(err))
//                 // game is NOT in the database already
//             } else {
//                 Drink.create(req.body)
//                     .then(() => {
//                         res.redirect(`/drinks/${req.params.id}`)
//                     })
//             }
//         })
// }

function createReview(req, res) {
    Drink.findById(req.params.id)
        .then((drink) => {
            drink.reviews.push(req.body)
            drink.save()
                .then(() => {
                    res.redirect(`/drinks/${drink._id}`)
                })
        })
}


function search(req, res) {
    res.render('drinks/search', {
        title: 'Search Results',
        user: req.user
    })
}

function update(req, res) {
    Drink.findByIdAndUpdate(req.params.id, req.body, function (err) {
        res.redirect('/drinks')
    });
}

function delDrink(req, res, next) {
    Drink.findByIdAndDelete(req.params.id, err => {
        res.redirect('/users/myBooze')
    })
}

function show(req, res) {
    Drink.findById(req.params.id)
        .populate({ path: 'reviews.postedBy', model: 'User' })
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
        // res.redirect('/drinks')
    })
}


function newDrink(req, res) {
    // console.log('user', user);
    res.render('drinks/new', {
        user: req.user,
        title: 'New Drink',

    })
}


function index(req, res) {
    Drink.find({ /*postedBy: req.user._id*/ })
        .then((drinks) => {
            // console.log(drinks);
            res.render("drinks/index", {
                title: "All Drinks",
                user: req.user,
                drinks
            })
        })
}