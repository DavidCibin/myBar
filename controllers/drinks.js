const Drink = require("../models/user");

module.exports = {
    index,
    
};

// function index(req, res) {
//     Drink.find({}).then((users) => {
//         res.render('users/index', {
//             user: req.user, user,
//             title: 'Users Index'
//         })
//     })
// }

function index(req, res) {
    Drink.find({ postedBy: req.user._id })
    .then((drinks) => {
      res.render("drinks/index", {
        title: "All Drinks",
        user: req.user,
        drinks
      })
    })
  }