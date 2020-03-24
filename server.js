var express = require("express");
const port = 8082;
// const hostname = "localhost";
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mailRouter=require("./Routers/mailRouter")
const userRouter = require("./Routers/userRouter");
const postRouter = require("./Routers/postRouter");
const categoryRouter = require("./Routers/categoryRouter");
const commentRouter = require("./Routers/commentRouter");
var app = express();



app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

mongoose.connect(
  "mongodb://localhost:27017/ppl",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, result) => {
    if (result) console.log("connected to Database successfully");
  }
);

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/category", categoryRouter);
app.use("/comment", commentRouter);
app.use("/sendMail",mailRouter);
app.listen(port, (err, data) => {
  console.log(`Server running -> {hostname}:${port}`);
});
