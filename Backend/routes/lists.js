const express = require('express');
const router = express.Router();

// MongoDB models
const User = require('../models/User');
const List = require('../models/List');

/**
 * @swagger
 * /lists/{email}:
 *  get:
 *      tags:
 *          - lists
 *      summary: Returns all lists associated with email.
 *      parameters:
 *          - in: path
 *            name: email
 *            required: true
 *            type: string
 *            description: email of user
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad request - email not provided
 *          404:
 *              description: Not found - failed to find email
 */
router.get('/:email', async (req, res) => {
    // Ensure parameters are provided
    if (!req.params.email) {
        res.status(400).send('Malformed request');
        return;
    }

    try {
        // Check that user exists
        const user = await User.findOne({email: req.params.email});
        if (!user) {
          res.status(404).send('Could not find email');
          return;
        }

        // Get id from user
        const userId = user._id;

        // Get all user lists provided user_id
        const lists = await List.find({ user_id: userId })
        res.status(200).send(lists);    // Could be an empty list
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Something went wrong', error: err});
    }
});

/**
 * @swagger
 * /lists:
 *  post:
 *      tags:
 *          - lists
 *      summary: Creates a new list
 *      parameters:
 *          - in: body
 *            name: list
 *            description: The list to create and it's associated user.
 *            schema:
 *                type: object
 *                required:
 *                    - email
 *                    - list
 *                properties:
 *                    email:
 *                        type: string
 *                    list:
 *                        type: object
 *      responses:
 *          201:
 *              description: Created
 *          400:
 *              description: Bad request - malformed request
 *          403:
 *              description: Forbidden
 *          404:
 *              description: Not found - failed to find email
 */
router.post('/', async (req, res) => {
    const body = req.body;

    // Check that all details are provided
    if (!(body.email && body.list)) {
      res.status(400).send('Malformed request');
      return;
    }

    // Get the associated user_id
    User.findOne({ email: body.email }, async (err, result) => {
        if (!result) {
            res.status(404).send('Failed to find email');
            return;
        } else if (err) {
            console.log(err);
            res.status(500).json({ message: 'Something went wrong...', error: err});
            return;
        }

        // Make the request
        const list = new List({
            user_id: result._id,
            list: body.list,
        });
        
        // Attempt to save to database
        try {
            const savedList = await list.save();
            res.status(201).json(savedList);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Something went wrong...', error: err});
        }
    });
});

module.exports = router;