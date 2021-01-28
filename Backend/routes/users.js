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
    const user = await User.findOne({email: req.params.email});
    if (!user) {
      res.status(404).send('Could not find email');
      return;
    }

    // Remove password for safety
    user.password = undefined;
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
 *      400:
 *        description: Bad request - malformed request
 *      403:
 *        description: Forbidden - duplicate details
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
    // Check if already exists but deleted
    const storedUser = await User.findOne({email: body.email});
    if (storedUser && storedUser.date_of_delection) {
      // Update user details.
      await User.updateOne({email: body.email}, {$set: {password: body.password, date_of_delection: undefined}});

      // Remove password for safety
      storedUser.password = undefined;
      res.status(200).json({message: 'User previously deleted, new account created', data: storedUser});
      return;
    }

    const savedUser = await user.save();
    // Remove password for safety
    savedUser.password = undefined;
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: 'Duplicated email', error: err});
  }
});

/**
 * @swagger
 * /users:
 *  delete:
 *    tags:
 *    - users
 *    summary: Deletes a user
 *    parameters:
 *    - in: body
 *      name: user
 *      description: The user to delete.
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
 *      200:
 *        description: Deleted
 *      400:
 *        description: Bad request - malformed request
 *      401:
 *        description: Unauthorized - incorrect password
 *      404:
 *        description: Not found - email not found
 */
router.delete('/', async (req, res) => {
  const body = req.body;

  // Check that all details are provided
  if (!(body.email && body.password)) {
    res.status(400).send('Malformed request');
    return;
  }

  // Attempt to delete from the database
  try {
    const user = await User.findOne({email: body.email, date_of_delection: undefined});

    if (!user) { // Check that the user exists
      res.status(404).send('Could not find email');
    } else if (user.password !== body.password) { // Check if passwords match
      res.status(401).send('Incorrect password');
    } else {
      // Set 'time_of_deletion' for user
      await User.updateOne({email: body.email}, {$set: {date_of_delection: Date.now()}});

      // Remove password from response
      user.password = undefined
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong...', error: err});
  }
});

/**
 * @swagger
 * /users/login:
 *  post:
 *    tags:
 *      - users
 *    summary: Authenticate user.
 *    parameters:
 *    - in: body
 *      name: user
 *      description: The user details to login.
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
 *      200:
 *        description: Login successful
 *      400:
 *        description: Bad request - malformed request
 *      401:
 *        description: Unauthorized - incorrect password
 *      403:
 *        description: Forbidden - duplicate details
 */
router.post('/login', async (req, res) => {
  const body = req.body;

  // Check that all details are provided
  if (!(body.email && body.password)) {
    res.status(400).send('Malformed request');
    return;
  }

  // Contact database
  try {
    // Check if user exists
    const user = await User.findOne({email: body.email, date_of_delection: undefined});
    
    if (!user) { // Check that the user exists
      res.status(404).send('Could not find email');
    } else if (user.password !== body.password) { // Check if passwords match
      res.status(401).send('Incorrect password');
    } else {
      res.status(200).send('Success');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong...', error: err});
  }
});

module.exports = router;
