var express = require("express");
var router = express.Router();
const api = require("../api/categoryApi");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/post");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send("Server FOR Category Working fine");
});

router.post("/addCategory", upload.single("image"), async (req, res) => {
  try {
    req.body.category = req.body.categoryName.toLowerCase();
    await api.isCategoryAlreadyExist(req.body.category);
    req.body["image"] = req.file.filename;
    let data = await api.addCategory(req.body);
    res.send(data);
  } catch {
    res.send();
  }
});
router.get("/getCategories", async (req, res) => {
  try {
    let data = await api.getCategories();
    res.send(data);
  } catch (err) {
    res.send();
  }
});
module.exports = router;
