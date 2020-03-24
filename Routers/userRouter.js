const express = require("express");
const router = express.Router();
const api = require("../api/userApi");
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
  res.send("Server Working fine");
});

router.post("/updateCategory", upload.single("image"), (req, res) => {});

router.post("/insertUser", upload.none(), async (req, res) => {
  try {
    await api.isUnique(req.body.email);
    let data = await api.createUser(req.body);
    res.send(data);
  } catch {
    res.end();
  }
});
router.post("/loginUser", upload.none(), async (req, res) => {
  try {
    let data = await api.login(req.body.email, req.body.password);
    res.send(data);
  } catch (e) {
    res.send();
  }
});
module.exports = router;
