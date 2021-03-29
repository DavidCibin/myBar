const User = require("../models/user");
const Drink = require("../models/drink");

module.exports = {
    index,
    showMyBooze,
};

function showMyBooze(req, res) {
    Drink.findById(req.params.id)
   
    User.findById(req.user._id)
    .populate("postedBy")
        .then((user) => {
            // console.log(user.name)
            console.log('user.drink??', user.drink)
            // console.log('test 1', drink.drink)
            // console.log('test 2', drink)
            res.render("users/mybooze", {
                user: req.user,
                title: "Profile Page"
            });
        });
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