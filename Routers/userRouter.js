const express = require("express");
const router = express.Router();
const api = require("../api/userApi");
const multer = require("multer");
const sgMail = require("@sendgrid/mail");
// const sendVerificationMail = require("./mailRouter");
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
    const msg = {
      to: data.email,
      from: "ankur.gahtori@daffodilsw.com",
      subject: "Verify ppl account",
      text: "www.facebook.com/Ankur",
      html: `<a href='http://localhost:3000/verify/${data._id}'>Verify Link</a>`
    };
    sgMail.send(msg);
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
router.post("/updatePassword", upload.none(), async (req, res) => {
  try {
    console.log(req.body);
    let data = await api.updatePassword(req.body);
    res.send(data);
    console.log(data);
  } catch (err) {
    res.end();
  }
});
router.post("/verify", async (req, res) => {
  try {
    let data = await api.verifyUser(req.body);
    console.log(data);
    res.send(data);
  } catch (err) {
    res.end();
  }
});
module.exports = router;
