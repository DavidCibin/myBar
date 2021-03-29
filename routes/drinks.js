const router = require('express').Router()
const drinksCtrl = require("../controllers/drinks")

// router.get("/", isLoggedIn, drinksCtrl.index)
// router.get("/new", isLoggedIn, drinksCtrl.new)
// router.get("/", isLoggedIn, drinksCtrl.create)

router.get("/", drinksCtrl.index)
router.get("/new", drinksCtrl.new)
router.post("/", drinksCtrl.create)
router.get("/:id", drinksCtrl.show)
router.delete('/:id', drinksCtrl.delete);
router.put('/:id', drinksCtrl.update)
router.get('/search', drinksCtrl.search)
router.post("/:id", drinksCtrl.createReview)


// router.get("/:slug", isLoggedIn, drinksCtrl.show)
// router.post("/search", isLoggedIn, drinksCtrl.search)
// router.post("/:slug/watch", isLoggedIn, drinksCtrl.addToWatchList)
// router.post("/:slug/collection", isLoggedIn, drinksCtrl.addToCollection)
// router.post("/:id/review", isLoggedIn, drinksCtrl.createReview)
// router.delete("/:slug/watch", isLoggedIn, drinksCtrl.removeFromWatchList)
// router.delete("/:slug/collection", isLoggedIn, drinksCtrl.removeFromCollection)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;