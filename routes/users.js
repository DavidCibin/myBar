const router = require("express").Router();
const usersCtrl = require("../controllers/users");

router.get("/users", isLoggedIn, usersCtrl.index);
router.get("/mybooze", isLoggedIn, usersCtrl.showMyBooze)
router.put('/:id', isLoggedIn, usersCtrl.update)
router.get('/:id/edit', isLoggedIn, usersCtrl.edit)
router.delete('/:drinkId/myBooze', isLoggedIn, usersCtrl.delFromMyBooze)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
