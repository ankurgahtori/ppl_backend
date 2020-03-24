const express = require("express");
const router = express.Router();
const mailApiKey = require("../config/keys");
const sgMail = require("@sendgrid/mail");
const api = require("../api/userApi");
sgMail.setApiKey(mailApiKey);
const multer = require("multer");
const upload = multer();
router.post("/", upload.none(), async (req, res) => {
  try {
    let userID = await api.getUserByEmail(req.body);
    const msg = {
      to: req.body.email,
      from: "ankur.gahtori@daffodilsw.com",
      subject: "password reset ppl",
      text: "www.facebook.com/Ankur",
      html: `<a href='http://localhost:3000/reset/${userID._id}'>Reset Password Link</a>`
    };
    sgMail.send(msg);
    res.send(userID);
  } catch (err) {
    res.end();
  }
});

module.exports = router;
