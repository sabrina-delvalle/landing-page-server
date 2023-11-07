require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
var favicon = require("serve-favicon");
var path = require("path");
const mongoose = require("mongoose");
const { PORT } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(favicon(path.join(__dirname, "ico", "favicon.ico")));
mongoose.set("strictQuery", false);

app.use("/", require("./routes/contacts"));

/* app.get("/", (req, res) => {
    res.send('Hello! Its a good time to try and start')
}) */

/* app.listen(PORT, () => console.log(`listening on port ${PORT}`)) */

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    app.listen(PORT, () => console.log(`Listening port ${PORT}`));
  })
  .catch((err) => console.log(err));
