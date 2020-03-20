const express = require("express");
const router = express.Router();
const api = require("../api/commentApi");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname.split("Backend")[0] + "/Frontend/public/category");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send("Server comment Working fine");
});

router.post("/addComment", upload.none(), async (req, res) => {
  let data = await api.addComment(req.body);
  res.send(data);
});

router.post("/getComment", async (req, res) => {
  try {
    let data = await api.getComment(req.body);
    res.send(data);
  } catch {
    res.send();
  }
});
router.post("/getCommentByID", async (req, res) => {
  try {
    let data = await api.getCommentByID(req.body);
    res.send(data);
  } catch {
    res.send();
  }
});
module.exports = router;
