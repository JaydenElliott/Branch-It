const express = require("express");
const router = express.Router();

// MongoDB models
const User = require("../models/User");
const List = require("../models/List");

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
router.get("/:email", async (req, res) => {
  // Ensure parameters are provided
  if (!req.params.email) {
    res.status(400).send("Bad request");
    return;
  }

  try {
    // Check that user exists
    const user = await User.findOne({
      email: req.params.email,
      date_of_delection: undefined,
    });
    if (!user) {
      res.status(404).send("Could not find email");
      return;
    }

    // Get id from user
    const userId = user._id;

    // Get all user lists provided user_id
    const lists = await List.find({
      user_id: userId,
      date_of_delection: undefined,
    });
    res.status(200).send(lists); // Could be an empty list
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong", error: err });
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
router.post("/", async (req, res) => {
  const body = req.body;

  // Check that all details are provided
  if (!(body.email && body.list)) {
    res.status(400).send("Bad request");
    return;
  }

  // Get the associated user_id
  User.findOne({ email: body.email }, async (err, result) => {
    if (!result) {
      res.status(404).send("Failed to find email");
      return;
    } else if (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong...", error: err });
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
      res.status(500).json({ message: "Something went wrong...", error: err });
    }
  });
});

/**
 * @swagger
 * /lists:
 *  delete:
 *      tags:
 *          - lists
 *      summary: Deletes a list
 *      parameters:
 *          - in: body
 *            name: list
 *            description: The list to delete.
 *            schema:
 *                type: object
 *                required:
 *                    - list_id
 *                properties:
 *                    list_id:
 *                        type: string
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad request - malformed request
 *          403:
 *              description: Forbidden - already deleted
 *          404:
 *              description: Not found - failed to find list_id
 */
router.delete("/", async (req, res) => {
  const body = req.body;
  // Check that all details are provided
  if (!body.list_id) {
    res.status(400).send("Bad request");
    return;
  }

  try {
    // To prevent double deletion, search for item and ensure that it has not already been deleted.
    // Find whether the list exists
    const id = body.list_id;
    const listToDel = await List.findOne({ "list.reactFlow.id": id });
    if (listToDel && listToDel.date_of_delection) {
      res.status(404).send("Not Found");
      return;
    }

    // Get the associated
    List.updateOne(
      { "list.reactFlow.id": id },
      { $set: { date_of_delection: Date.now() } },
      (err, result) => {
        if (result.nModified === 0) {
          res.status(404).send("Not found");
          return;
        } else if (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "Something went wrong...", error: err });
        } else {
          res.status(200).send("Deleted");
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong...", error: err });
  }
});

/**
 * @swagger
 * /lists:
 *  put:
 *      tags:
 *          - lists
 *      summary: Updates or creates a new list
 *      parameters:
 *          - in: body
 *            name: list
 *            description: The list to create/update and it's associated user.
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
 *          204:
 *              description: Updated
 *          400:
 *              description: Bad request - malformed request
 *          404:
 *              description: Not found - failed to find email
 */
router.put("/", async (req, res) => {
  const body = req.body;

  // Check that all details are provided
  if (
    !body.list ||
    !body.list.reactFlow ||
    !body.list.reactFlow.id ||
    !body.email
  ) {
    res.status(400).send("Bad request, must contain reactFlow id and email");
    return;
  }

  try {
    // Check that user exists
    const user = await User.findOne({
      email: body.email,
      date_of_delection: undefined,
    });
    if (!user) {
      res.status(404).send("Could not find email");
      return;
    }
    // Find whether the list exists
    const id = body.list.reactFlow.id;
    const list = await List.findOne({ "list.reactFlow.id": id });
    if (!list) {
      // make a new list
      const newList = new List({
        user_id: user._id,
        list: body.list,
      });

      newList.save();
      res.status(201).json(newList);
      return;
    }

    // Update the list
    await List.updateOne(
      { "list.reactFlow.id": id },
      { $set: { list: body.list }, date_of_delection: undefined }
    );
    res.status(200).send("Updated");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong...", error: err });
  }
});

module.exports = router;
