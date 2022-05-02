const express = require("express");
const asyncHandler = require("express-async-handler");

const { Comment } = require("../../db/models");

const router = express.Router();

//ROUTE HANDLING
//GET ALL comments
router.get('/', asyncHandler(async (req, res) => {
    const comments = await Comment.findAll();
    // console.log('\n\n', comments, '\n\n')
    return res.json({ comments: comments.reverse() })
}));

//POST ONE comment
router.post("/", asyncHandler(async(req, res) => {
    const comment = await Comment.create(req.body);
    comment.content = `${comment.content}: ${comment.id}`;
    // console.log('\n\n', comment, '\n\n')
    await comment.save();
    return res.json(comment);
  })
);

//DELETE ONE comment
router.delete('/delete/comment/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Comment.destroy({ where: { id: id } });
    return res.json(`Deleted comment id ${id}`);
}));


module.exports = router;
