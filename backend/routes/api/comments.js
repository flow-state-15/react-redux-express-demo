const express = require("express");
const asyncHandler = require("express-async-handler");

const { Comment } = require("../../db/models");

const router = express.Router();

//ROUTE HANDLING
//GET ALL comments
router.get('/', asyncHandler(async (req, res) => {
    const comments = await Comment.findAll();
    return res.json({ comments: comments.reverse() })
}));

//POST ONE comment
router.post("/", asyncHandler(async(req, res) => {
    const comment = await Comment.create(req.body);
    comment.content = `${comment.content}: ${comment.id}`;
    await comment.save();
    return res.json(comment);
  })
);

//DELETE ONE comment
router.delete('/delete/comment/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    (await Comment.findByPk(id)).destroy();
    return res.json(`Deleted comment id ${id}`);
}));


module.exports = router;
