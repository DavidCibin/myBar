const User = require("../models/user");
const Drink = require("../models/drink");

module.exports = {
    index,
    showMyBooze,
};

function showMyBooze(req, res) {
    Drink.find({ postedBy: req.user._id })
        .then((drinks) => {
            User.findById(req.user._id)
                .populate("postedBy")
                .then((user) => {
                    res.render("users/mybooze", {
                        user,
                        title: "Profile Page",
                        drinks
                    });
                });

        })
}

// function showMyBooze(req, res) {
//     User.findById(req.params.id)
//     .then((userInfo) => {
//       Game.find({ collectedBy: userInfo._id })
//       .then((games) => {
//         res.render('users/show', {
//           title: 'User Details',
//           userInfo,
//           user: req.user,
//           games
//         })
//       })
//     })
//   }

function index(req, res) {
    User.find({}).then((users) => {
        res.render('users/index', {
            user: req.user, user,
            title: 'Users Index'
        })
    })
}