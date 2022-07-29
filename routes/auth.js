const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET;

router.get("/", (req, res) => {
  console.log("on the home page");
});
router.post(
  "/signup",
  body("firstName", "Name must be atleast of length 3").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password", "Password must be atleast of length 8").isLength({ min: 4 }),
  async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Email already exists" });
    }

    // if (req.body.password != req.body.cpassword) {
    //   return res.status(400).json({ error: "Passwords don't match" });
    // }

    user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    const data = {
      newUser: {
        id: user.id,
      },
    };
    success = true;
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ success, authToken });
  }
);
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password field can't be blank").exists(),
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success, error: "Invalid login credentials" });
    }
    if (password != user.password) {
      return res
        .status(400)
        .json({ success, error: "Invalid login credentials" });
    }
    const data = {
      newUser: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });
  }
);

module.exports = router;
