const express = require("express");
const router = express.Router();
const Preferences = require("../models/Preferences");


router.get("/", (req, res) => {
  console.log("get preferences");
});
router.put(
  "/set-like/:blogId/:userId",
  async (req, res) => {
    
    let preference = await preference.find({ blogId: req.params.blogId, userId: req.params.userId });
    if (preference) {
      preference.dislike = false
      preference.like = !preference.like
      let preferenceNew = await Preferences.findByIdAndUpdate(
        preference._id,
        { $set: preference},
        { new: true }
        );
        res.status(200).json(preferenceNew)
    }
    else {
      let preference = new preference({
        like: true,
        dislike: false,
        favourite: false
      })
      let updatedPreferences = await preference.save()
      res.status(200).json(updatedPreferences)
    }
  });
router.put(
  "/set-dislike/:blogId/:userId",
  async (req, res) => {
    
    let preference = await preference.find({ blogId: req.params.blogId, userId: req.params.userId });
    if (preference) {
      preference.like = false
      preference.dislike = !preference.dislike
      let preferenceNew = await Preferences.findByIdAndUpdate(
        preference._id,
        { $set: preference},
        { new: true }
        );
        res.status(200).json(preferenceNew)
    }
    else {
      let preference = new preference({
        like: false,
        dislike: true,
        favourite: false
      })
      let updatedPreferences = await preference.save()
      res.status(200).json(updatedPreferences)
    }
  });
router.put(
  "/set-favourite/:blogId/:userId",
  async (req, res) => {
    
    let preference = await preference.find({ blogId: req.params.blogId, userId: req.params.userId });
    if (preference) {
      preference.favourite = !preference.favourite
      let preferenceNew = await Preferences.findByIdAndUpdate(
        preference._id,
        { $set: preference},
        { new: true }
      );
      res.status(200).json(preferenceNew)
    }
    else {
      let preference = new preference({
        like: false,
        dislike: false,
        favourite: true
      })
      let updatedPreferences = await preference.save()
      res.status(200).json(updatedPreferences)
    }
  });

module.exports = router;
