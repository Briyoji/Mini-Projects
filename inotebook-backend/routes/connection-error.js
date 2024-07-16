const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Error connecting to Database!");
})

module.exports = router;