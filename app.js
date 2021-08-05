const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
app.use(cors());

mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("DB is Connected..");
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/auth-route"));
app.use("/user", require("./routes/user-route"));
app.use("/post", require("./routes/post-route"));
app.use("/comment", require("./routes/commet-route"));
app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});
app.get("*", (req, res) => [res.status(404).send("No Route is define")]);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running at port $3000"));
