const router = require("express").Router();
const usersCtrl = require("../controllers/users")

router.get("/", function (req, res) {
  res.render("index", { title: "Home Page", user: req.user ? req.user : null });
});

module.exports = router;
