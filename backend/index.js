import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Post } from "./models/postModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Goodbye, World!");
});

// Route for Save a new Post
app.post("/posts", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.post ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, post, publishYear",
      });
    }

    const newPost = {
      title: request.body.title,
      author: request.body.author,
      post: request.body.post,
      publishYear: request.body.publishYear,
    };

    const post = await Post.create(newPost);

    return response.status(201).send(post);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get ALL Posts from database
app.get("/posts", async (request, response) => {
  try {
    const posts = await Post.find({});

    return response.status(200).json({
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Post from database by id
app.get("/posts/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const post = await Post.findById(id);

    return response.status(200).json({
      count: post.length,
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Post
app.put("/posts/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.post ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, post, publish year.",
      });
    }

    const { id } = request.params;

    const result = await Post.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Post not found." });
    }

    return response.status(200).send({ message: "Post updated successfully." });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a Post

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
