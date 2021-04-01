const router = require('express').Router()
const drinksCtrl = require("../controllers/drinks")

router.get('/', isLoggedIn, drinksCtrl.index)
router.get('/new', isLoggedIn, drinksCtrl.new)
router.post('/', isLoggedIn, drinksCtrl.create)
router.post('/search', isLoggedIn, drinksCtrl.search)
router.get('/:id', isLoggedIn, drinksCtrl.show)
router.get('/:id/edit', isLoggedIn, drinksCtrl.edit)
router.put('/:id', isLoggedIn, drinksCtrl.update)
router.delete('/:id', isLoggedIn, drinksCtrl.delete)
router.post('/:id', isLoggedIn, drinksCtrl.createReview)
router.post('/:drinkId/myBooze', isLoggedIn, drinksCtrl.addToMyBooze) 
router.delete('/:drinkId/myBooze', isLoggedIn, drinksCtrl.delFromMyBooze)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;