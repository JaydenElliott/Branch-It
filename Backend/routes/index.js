const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send("Welcome to the Branch-It API");
});

/**
 * @swagger
 * /ping:
 *  get:
 *    tags:
 *      - default
 *    summary: responds with 'pong!'
 *    responses:
 *      200:
 *        description: ok
 */
router.get('/ping', (req, res) => {
  res.send('pong!');
});

module.exports = router;