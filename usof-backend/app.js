const express = require("express");
const db = require("./db/sequelize.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const usersRouter = require("./routes/users.routes");
const postsRouter = require("./routes/posts.routes");
const categoriesRouter = require("./routes/categories.routes");
const commentsRouter = require("./routes/comments.routes");
const errorMiddleware = require("./middleware/apiError.middlware");

require("dotenv").config({ path: "./.env" });
require("./db/init.js")();

const app = express();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/comments", commentsRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () =>
  console.log(`server is running on http://${HOST}:${PORT}`)
);
