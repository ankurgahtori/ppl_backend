const db = require("../schemas/userSchema");
module.exports = {
  login: email => {
    let filter = { email: email };
    return new Promise((resolve, reject) => {
      db.findOne(filter, (err, data) => {
        if (data) {
          resolve(data);
        } else {
          reject();
        }
      });
    });
  },
  isUnique: email => {
    return new Promise((resolve, reject) => {
      var filter = { email: email };
      db.findOne(filter, (err, data) => {
        if (data) {
          reject();
        } else {
          resolve(data);
        }
      });
    });
  },
  createUser: data => {
    return new Promise((resolve, reject) => {
      db.create(data, (err, data) => {
        if (data) resolve(data);
        else reject();
      });
    });
  },
  getUserByEmail: data => {
    return new Promise((resolve, reject) => {
      db.findOne(data, (err, result) => {
        if (result) {
          let { _id } = result;
          resolve({ _id });
        } else {
          reject();
        }
      });
    });
  },
  updateProfilePic: data => {
    return new Promise((resolve, reject) => {
      console.log(data);
      db.findOneAndUpdate(
        { _id: data.userID },
        { $set: { image: data.image } },
        { new: true },
        (err, result) => {
          if (result) {
            console.log("resolving");
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  updatePassword: data => {
    return new Promise((resolve, reject) => {
      db.updateOne(
        { _id: data.userID },
        { $set: { password: data.password } },
        (err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject();
          }
        }
      );
    });
  },
  verifyUser: data => {
    return new Promise((resolve, reject) => {
      db.findOneAndUpdate(
        data,
        { $set: { isVerified: true } },
        { new: true },
        (err, data) => {
          if (data) {
            resolve(data);
          } else {
            reject();
          }
        }
      );
    });
  }
};
