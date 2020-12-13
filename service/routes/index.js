const express = require('express');

const router = express.Router();

// router.use(function timeLog(req, res, next) {
//     console.log('Path: ', req.originalUrl)
//     console.log('Time: ', Date.now())
//     next()
// })

router.get('/', (req, res) => {
    res.send('GET request to the homepage')
});

module.exports = router;