const router = require("express").Router();
const usersCtrl = require("../controllers/users");

router.get("/users", isLoggedIn, usersCtrl.index);
router.get("/mybooze", isLoggedIn, usersCtrl.showMyBooze)
router.delete('/:drinkId/myBooze', isLoggedIn, usersCtrl.delFromMyBooze)
// router.delete('/:id', usersCtrl.delete)

// router.get("/getName", isLoggedIn, usersCtrl.getName)
// router.get("/:id", isLoggedIn, usersCtrl.show)
// router.get("/:id/friend", isLoggedIn, usersCtrl.addFriend)
// router.get("/:id/unfriend", isLoggedIn, usersCtrl.removeFriend)
// router.put("/profile", isLoggedIn, usersCtrl.update)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
