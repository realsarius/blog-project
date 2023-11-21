import express from "express";
import { Post } from "../models/postModel.js";

const router = express.Router();

/* POST post */
router.post("/", async (request, response) => {
  try {
    const { title, author, content, tags } = request.body;

    if (!title || !author || !content || !tags) {
      return response.status(400).send({
        message: "Send all required fields: title, author, content, tags",
      });
    }

    // Create a new post
    const post = new Post({
      title,
      author,
      content,
      tags,
    });

    // Save the post into the DB
    await post.save();

    return response.status(201).json({
      statusCode: 201,
      message: "Created post",
      data: { post },
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/* GET posts */
router.get("/", async (request, response) => {
  try {
    // sort from the latest to the earliest
    const posts = await Post.find().sort({ createdAt: "desc" });

    return response.status(200).json({
      statusCode: 200,
      message: "Fetched all posts",
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/* GET post */
router.get("/:id", async (request, response) => {
  try {
    // req.params contains the route parameters and the id is one of them
    const post = await Post.findById(request.params.id);

    return response.status(200).json({
      statusCode: 200,
      message: "Fetched post",
      count: post.length,
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/* PUT post */
router.put("/:id", async (request, response) => {
  try {
    const { title, author, content, tags } = request.body;

    if (!title || !author || !content || !tags) {
      return response.status(400).send({
        message: "Send all required fields: title, author, content, tags.",
      });
    }

    // findByIdAndUpdate accepts the post id as the first parameter and the new values as the second parameter
    const post = await Post.findByIdAndUpdate(request.params.id, {
      title,
      author,
      content,
      tags,
    });

    return response.status(200).json({
      statusCode: 200,
      message: "Updated post",
      data: { post },
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

/* DELETE post */
router.delete("/:id", async (request, response) => {
  try {
    // Mongo stores the id as `_id` by default
    const result = await Post.deleteOne({ _id: request.params.id });

    if (!result) {
      return response.status(404).json({ message: "Post not found." });
    }

    return response.status(200).json({
      statusCode: 200,
      message: `Deleted ${result.deletedCount} post(s)`,
      data: {},
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
