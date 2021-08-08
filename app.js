const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const authRouter = require("./routes/auth-route");
const commentRouter = require("./routes/comment-route");
const postRouter = require("./routes/post-route");
const userRouter = require("./routes/user-route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("DB is Connected..");
  }
);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/post", commentRouter);
app.get("*", (req, res) => [res.status(404).send("No Route is define")]);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running at port $3000"));
