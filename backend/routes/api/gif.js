const express = require('express');

const router = express.Router();

let index = 0;

router.get('/get-index',  (req, res) => {
    if (index > 60) {
        index = 0;
        return res.json({"frame_index": index})
    }
    index += 1;
    return res.json({"frame_index": index})
});

module.exports = router
