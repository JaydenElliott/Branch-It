const express = require('express');
const router = express.Router();

// MongoDB models
const User = require('../models/User');

/**
 * @swagger
 * /users/{email}:
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
 *        description: Ok
 *      400:
 *        description: Bad Request - email not provided
 *      404:
 *        description: Not Found - failed to find email
 */
router.get('/:email', async (req, res) => {
  // Ensure parameters are provided
  if (!req.params.email) {
    res.status(400).send('Malformed request');
    return;
  }

  // Attempt to get details of user
  try {
    // Get data from MongoDB
    const user = await User.find({email: req.params.email});
    if (user.length <= 0) {
      res.status(404).send('Could not find email');
      return;
    }

    // Remove password for safety
    user[0].password = undefined;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Something went wrong', error: err});
  }
});

/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *      - users
 *    summary: Creates a new user
 *    parameters:
 *    - in: body
 *      name: user
 *      description: The user to create.
 *      schema:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *    responses:
 *      201:
 *        description: Created
 *      403:
 *        description: Forbidden - duplicate details
 *      400:
 *        description: Bad request - malformed request
 */
router.post('/', async (req, res) => {
  const body = req.body;

  // Check that all details are provided
  if (!(body.email && body.password)) {
    res.status(400).send('Malformed request');
    return;
  }

  // Make the request
  const user = new User({
    email: body.email,
    password: body.password,
  });

  // Attempt to save to database
  try {
    const savedUser = await user.save();
    // Remove password for safety
    savedUser.password = undefined;
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: 'Duplicated email', error: err});
  }
});

module.exports = router;
