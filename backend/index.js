import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import postsRoute from './routes/postsRoute.js';
import usersRouter from './routes/usersRoute.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Middleware for parsing request body
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: '200mb' }));

// Middleware for handling CORS Policy
app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Goodbye, World!');
});

app.use('/posts', postsRoute);
app.use('/users', usersRouter);

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log('connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
