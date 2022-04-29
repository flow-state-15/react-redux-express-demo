const express = require("express");
const asyncHandler = require("express-async-handler");

const { Post } = require("../../db/models");

const router = express.Router();

//ROUTE HANDLING
//GET ALL posts
router.get('/', asyncHandler(async (req, res) => {
    const posts = await Post.findAll();
    return res.json({posts: posts.reverse()})
}));

//POST ONE post
router.post("/", asyncHandler(async(req, res) => {
    const post = await Post.create(req.body);
    post.content = `${post.content}: ${post.id}`;
    await post.save();
    return res.json(post);
  })
);

//DELETE ONE post
router.delete('/delete/post/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    (await Post.findByPk(id)).destroy();
    return res.json(`Deleted post id ${id}`);
}));


module.exports = router;
