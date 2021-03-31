const router = require('express').Router()
const drinksCtrl = require("../controllers/drinks")


router.get('/', drinksCtrl.index)
router.get('/new', drinksCtrl.new)
router.post('/', drinksCtrl.create)
router.post('/search', drinksCtrl.search)
router.get('/:id', drinksCtrl.show)
router.get('/:id/edit', drinksCtrl.edit)
router.delete('/:id', drinksCtrl.delete)
router.put('/:id', drinksCtrl.update)
router.post('/:id', drinksCtrl.createReview)
router.post('/:drinkId/myBooze', drinksCtrl.addToMyBooze) 
router.delete('/:drinkId/myBooze', drinksCtrl.delFromMyBooze)


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;