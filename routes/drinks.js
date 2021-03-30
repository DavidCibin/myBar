const router = require('express').Router()
const drinksCtrl = require("../controllers/drinks")


router.get("/", drinksCtrl.index)
router.get("/new", drinksCtrl.new)
router.post("/", drinksCtrl.create)
router.get("/:id", drinksCtrl.show)
router.delete('/:id', drinksCtrl.delete)
router.put('/:id', drinksCtrl.update)
router.get('/search', drinksCtrl.search)
router.post("/:id", drinksCtrl.createReview)
router.post("/:drinkId/myBooze", drinksCtrl.addToMyBooze) 



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;