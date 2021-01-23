const express = require('express');
const router = express.Router();

// mongodb
const mongoClient = require('mongodb').MongoClient;
const branchItDatabase = 'localhost:27017';

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - users
 *    summary: Returns info (excluding password) of the user
 *    parameters:
 *      - in: path
 *        name: email
 *        required: true
 *        type: string
 *        description: email of user
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: ok
 *      404:
 *        description: failed to find email
 */
router.get('/', function(req, res, next) {
  // TODO: mongodb
  res.send('respond with a resource');
});

module.exports = router;
