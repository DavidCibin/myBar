const User = require("../models/user");
const Drink = require("../models/drink");

module.exports = {
    index,
    showMyBooze,
    // savedBooze,
};



// function savedBooze(req, res) {
//     Drink.find({ saved: req.params.drinkId })
//     console.log(req.params.drinkId)
//         .then((saves) => {
//             User.findById(req.user._id)
//                 .populate('saved')
//                 .then((user) => {
//                     res.render("users/mybooze", {
//                         saves,
//                         title: 'Profile Page',
//                         user
//                     })
//                 })
//         })
// }

function index(req, res) {
    User.find({}).then((users) => {
        res.render('users/index', {
            user: req.user, user,
            title: 'Users Index'
        })
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

