const Drink = require("../models/user");

module.exports = {
    index,
    new: newDrink,

};

function newDrink(req, res) {
    // console.log('user', user);
    res.render('drinks/new', {
        user: req.user,
        title: 'New Drink',
        
    })
}
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
            console.log(drinks);
            res.render("drinks/index", {
                title: "All Drinks",
                user: req.user,
                drinks
            })
        })
}