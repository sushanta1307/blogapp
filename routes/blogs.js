const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Blog = require("../models/Blogs");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    const allBlogs = [];
    for (var i = 0; i < blogs.length; i++) {
      var user = await User.findById(
        mongoose.Types.ObjectId(blogs[i].user)
      )
        .select("firstName")
        .select("lastName");
      allBlogs.push({
        _id: blogs[i]._id,
        title: blogs[i].title,
        description: blogs[i].description,
        author: user.firstName + " " + user.lastName,
        likes: blogs[i].likes,
        dislikes: blogs[i].dislikes
      });
    }
    res.send(allBlogs);
  } catch (err) {
    res.send(err);
  }
});

router.post(
  "/addblog",
  fetchuser,
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body(
    "description",
    "Description must be at least 100 characters length"
  ).isLength({ min: 100 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description } = req.body;
      const blog = new Blog({
        title,
        description,
        user: req.user.id,
      });
      var savedData = await blog.save();
      // console.log(savedData._id)
      savedData.user = await User.findById(
        mongoose.Types.ObjectId(savedData.user)
      )
        .select("firstName")
        .select("lastName");
      var newblog = {
        _id: savedData._id,
        title: savedData.title,
        description: savedData.description,
        author: savedData.user.firstName + " " + savedData.user.lastName,
      };
      res.json(newblog);
    } catch (err) {
      res.send(err);
    }
  }
);

router.put("/updateblog/:id", fetchuser, async (req, res) => {
  try {
    const { title, description } = req.body;
    let newBlog = {};
    if (title) {
      newBlog.title = title;
    }
    if (description) {
      newBlog.description = description;
    }

    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Not Found");
    }
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(blog);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Not Found");
    }
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    blog = await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully", blog });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
