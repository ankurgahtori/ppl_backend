var express = require("express");
var router = express.Router();
const api = require("../api/postApi");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/post/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send("Server FOR POSTS Working fine");
});
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let today = new Date();
    let year = today.getFullYear();
    let date = today.getDate();
    let month = monthArray[today.getMonth()];

    var hours = today.getHours();
    var minutes = today.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;

    req.body["time"] = strTime;
    req.body["date"] = date + " " + month + " " + year;
    req.body["image"] = req.file.filename;

    let data = await api.addPost(req.body);
    res.send(data);
  } catch (err) {
    res.send("Error");
  }
});
router.get("/getPost", async (req, res) => {
  try {
    let data = await api.getPost();
    res.send(data);
  } catch {
    res.send();
  }
});
router.post("/updateDislike", upload.none(), async (req, res) => {
  try {
    console.log("pressing dislike", req.body);

    await api.removeLike(
      { postID: req.body.postID },
      { userID: req.body.userID }
    );
    let data = await api.updateDislike(
      { postID: req.body.postID },
      { userID: req.body.userID }
    );
    res.send(data);
  } catch (err) {
    res.end();
  }
});
router.post("/getPostByID", async (req, res) => {
  console.log("call reached here");
  try {
    let data = await api.getPostByID(req.body);
    console.log(data);
    res.send(data);
  } catch (err) {}
  res.end();
});

router.post("/updateLike", upload.none(), async (req, res) => {
  try {
    console.log("pressing like", req.body);
    await api.removeDislike(
      { postID: req.body.postID },
      { userID: req.body.userID }
    );
    let data = await api.updateLike(
      { postID: req.body.postID },
      { userID: req.body.userID }
    );
    res.send(data);
  } catch (err) {
    res.end();
  }
});
module.exports = router;
