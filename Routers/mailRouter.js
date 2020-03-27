const express = require("express");
const router = express.Router();
const mailApiKey = require("../config/keys")[0];
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
exports.sendVerificationMail = (email, id) => {
  console.log("call reached here");
  const msg = {
    to: email,
    from: "ankur.gahtori@daffodilsw.com",
    subject: "Verify ppl account",
    text: "www.facebook.com/Ankur",
    html: `<a href='http://localhost:3000/verify/${id}'>Verify Link</a>`
  };
  sgMail.send(msg);
  console.log("mail sent to : ", msg);
};
module.exports = router;
