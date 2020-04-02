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
    req.body["image"] = req.file.filename;
    let data = await api.addPost(req.body);
    res.send(data);
  } catch (err) {
    res.send("Error");
  }
});
router.get("/getPost", async (req, res) => {
  try {
    let sortBasedOn = req.param("sort");
    let sortingOrder = req.param("order");
    let desiredCategory = req.param("category");
    let limit = req.param("limit");
    let skip = req.param("skip");
    let data = await api.getAllPosts(
      limit,
      skip,
      desiredCategory,
      sortBasedOn,
      sortingOrder
    );

    res.send(data);
  } catch (err) {
    res.send();
  }
});
router.post("/addComment", upload.none(), async (req, res) => {
  try {
    let data = await api.addComment(
      {
        comment: req.body.comment,
        commentedBy: req.body.commentedBy
      },
      { _id: req.body.postID }
    );
    res.send(data);
  } catch (err) {
    res.end();
  }
});

router.post("/getPostByID", async (req, res) => {
  try {
    let data = await api.getPostByID(req.body);
    res.send(data);
  } catch (err) {}
  res.end();
});

router.post("/updateLike", upload.none(), async (req, res) => {
  try {
    let data = await api.updateLike(
      { postID: req.body.postID },
      { userID: req.body.userID }
    );
    res.send(data);
  } catch (err) {
    console.log("here data is :  ", err);
    res.end();
  }
});
module.exports = router;
