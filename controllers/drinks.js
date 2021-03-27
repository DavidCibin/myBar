const Drink = require("../models/drink");

module.exports = {
    index,
    new: newDrink,
    create,
    show,
    delete: delDrink,
    update
};

function update(req, res) {
    
}

function delDrink(req, res, next) {
    Drink.findByIdAndDelete(req.params.id, err => {
        res.redirect('/drinks')
    })
}

function show(req, res) {
    Drink.findById(req.params.id)
    .then((drink) => {
        res.render('drinks/show', {
            user: req.user,
            title: 'Drink details',
            drink
        })
    })
    .catch(err => console.log(err))
}

// function index(req, res) {
//     Drink.find({ /*postedBy: req.user._id*/ })
//         .then((drinks) => {
//             console.log(drinks);
//             res.render("drinks/index", {
//                 title: "All Drinks",
//                 user: req.user,
//                 drinks
//             })
//         })
// }

function create(req, res) {
    const drink = new Drink(req.body);
    drink.save( function (err) {
        if (err) {
            console.log(err);
            return res.render('drinks/new', { title: 'Add Drink' })
        }
        console.log(drink)
        res.redirect(`/drinks/${drink._id}`)
        // res.redirect('/drinks')
    })
}

// function create(req, res){
//     req.body.postedBy = req.user._id
//     Drink.create(req.body)
//     .then((drinks)=>{
//         res.redirect(`/drinks/${drink._id}`)
//     })
// }


// function create(req, res) {
//     const flight = new Flight(req.body);
//     flight.save(function (err) {
//       if (err) {
//         console.log(err)
//         return res.render('flights/new', {
//           title: "Add Flight"
//         })
//       }
//       console.log(flight)
//       res.redirect('/flights');
//     })
//   }

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
    Drink.find({ /*postedBy: req.user._id*/ })
        .then((drinks) => {
            console.log(drinks);
            res.render("drinks/index", {
                title: "All Drinks",
                user: req.user,
                drinks
            })
        })
}