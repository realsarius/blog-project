import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

/* POST user */
router.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).send({
        message: "Send all required fields: name, email, password.",
      });
    }

    // Create a new post
    const user = new User({
      name,
      email,
      password,
    });

    // Save the post into the DB
    await user.save();

    return response.status(201).json({
      statusCode: 201,
      message: "Created user",
      data: { user },
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/* GET users */
router.get("/", async (request, response) => {
  try {
    // sort from the latest to the earliest
    const users = await User.find().sort({ createdAt: "desc" });

    return response.status(200).json({
      statusCode: 200,
      message: "Fetched all users",
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/* GET user */
router.get("/:id", async (request, response) => {
  try {
    // req.params contains the route parameters and the id is one of them
    const user = await User.findById(request.params.id);

    return response.status(200).json({
      statusCode: 200,
      message: "Fetched user",
      count: user.length,
      data: {
        user: user || {},
      },
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/* PUT user */
router.put("/:id", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).send({
        message: "Send all required fields: name, email, password..",
      });
    }

    // findByIdAndUpdate accepts the user id as the first parameter and the new values as the second parameter
    const user = await User.findByIdAndUpdate(request.params.id, {
      name,
      email,
      password,
    });

    return response.status(200).json({
      statusCode: 200,
      message: "Updated user",
      data: { user },
    });

    // const { id } = request.params;

    // const result = await Post.findByIdAndUpdate(id, request.body);

    // if (!result) {
    //   return response.status(404).json({ message: "Post not found." });
    // }

    // return response.status(200).send({ message: "Post updated successfully." });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/* DELETE user */
router.delete("/:id", async (request, response) => {
  try {
    // Mongo stores the id as `_id` by default
    const result = await User.deleteOne({ _id: request.params.id });

    if (!result) {
      return response.status(404).json({ message: "User not found." });
    }

    return response.status(200).json({
      statusCode: 200,
      message: `Deleted ${result.deletedCount} user(s)`,
      data: {},
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
