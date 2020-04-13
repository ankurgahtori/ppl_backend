const express = require("express");
const router = express.Router();
const api = require("../api/userApi");
const multer = require("multer");
const sgMail = require("@sendgrid/mail");
const mailApiKey = require("../config/keys")[0];
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/keys");
const clientUrl = require("../config/clientUrl");
const bcrypt = require("bcrypt");
sgMail.setApiKey(mailApiKey);
const BCRYPT_SALT_ROUNDS = 10;

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/profile/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send("Server Working fine");
});

router.post("/insertUser", upload.none(), async (req, res) => {
  try {
    await api.isUnique(req.body.email);
    let password = req.body.password;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, async (err, hashedPassword) => {
      req.body.password = hashedPassword;
      let data = await api.createUser(req.body);
      res.send(data);
      const msg = {
        to: data.email,
        from: "ankur.gahtori@daffodilsw.com",
        subject: "Verify ppl account",
        text: "www.facebook.com/Ankur",
        html: `<a href='${clientUrl}/verify/${data._id}'>Verify Link</a>`
      };
      sgMail.send(msg);
    });
  } catch (err) {
    console.log(err);
    res.end();
  }
});
router.post("/updateProfilePic", upload.single("image"), async (req, res) => {
  try {
    let data = await api.updateProfilePic({
      userID: req.body.userID,
      image: req.file.filename
    });
    res.send(data);
  } catch (err) {
    console.log("rejecting", err);
    res.end();
  }
});
router.post("/loginUser", upload.none(), async (req, res) => {
  try {
    let data = await api.login(req.body.email, req.body.password);
    bcrypt.compare(data.password, req.body.password, (err, result) => {
      console.log(data);
      if (result) {
        res.send(data);
      } else {
        res.end();
      }
    });

    let userInfo = { ...data, password: "" };
    let secretKey = jwtKey[0];
    jwt.sign(userInfo, secretKey, (err, token) => {
      if (err) {
        console.log("failed to create token");
        res.end();
      } else {
        res.send({ token: token });
      }
    });
  } catch (e) {
    console.log(e);
    res.send();
  }
});
router.post("/updatePassword", upload.none(), async (req, res) => {
  try {
    let password = req.body.password;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, async (err, hashedPassword) => {
      req.body.password = hashedPassword;
      let data = await api.updatePassword(req.body);
      res.send(data);
    });
  } catch (err) {
    res.end();
  }
});
router.post("/verify", async (req, res) => {
  try {
    let data = await api.verifyUser(req.body);
    res.send(data);
  } catch (err) {
    res.end();
  }
});
router.post("/verifyUserToken", async (req, res) => {
  jwt.verify(req.body.token, jwtKey[0], (err, data) => {
    if (err) {
      res.end();
    } else {
      let { _doc } = data;
      res.send(_doc);
    }
  });
  router.post("/resetPassword", upload.none(), async (req, res) => {
    try {
      let userID = await api.getUserByEmail(req.body);
      const msg = {
        to: req.body.email,
        from: "ankur.gahtori@daffodilsw.com",
        subject: "password reset ppl",
        text: "www.facebook.com/Ankur",
        html: `<a href='${clientUrl}/reset/${userID._id}'>Reset Password Link</a>`
      };
      sgMail.send(msg);
      res.send(userID);
    } catch (err) {
      res.end();
    }
  });
});
module.exports = router;
