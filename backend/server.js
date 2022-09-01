import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import colors from "colors";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

import homeRoutes from "./routes/homeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

connectDB()

//app
const app = express();
app.use(express.json())

//middleware
app.use(cors()); //error handling
app.use(morgan("dev")); //show you endpoints in the terminal
app.use(bodyParser.json()); //request data in json format

//post as middleware
app.use('/v1/api', homeRoutes)
app.use('/v1/api/users', userRoutes)
app.use('/v1/api/auth', authRoutes)
app.use('/v1/api/blog', blogRoutes)
app.use('/v1/api/favorites', favoriteRoutes)
app.use('/v1/api/comments', commentRoutes)


//listen so that app can return response on port, port info on env file
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

