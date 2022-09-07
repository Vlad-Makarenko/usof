const express = require("express");
const app = express();

require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
 

app.listen(PORT, () =>
  console.log(`server is running on http://${HOST}:${PORT}`)
);
