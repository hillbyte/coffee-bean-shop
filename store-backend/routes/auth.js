const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
//==post route
router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({
      min: 5,
    }),
  ],
  signup
);
//===sign in route
router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password filed is required").isLength({
      min: 3,
    }),
  ],
  signin
);
//==sign out route
router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
