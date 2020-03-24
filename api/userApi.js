const db = require("../schemas/userSchema");
module.exports = {
  login: (email, password) => {
    let filter = { $and: [{ email: email }, { password: password }] };
    // console.log(filter);
    return new Promise((resolve, reject) => {
      db.findOne(filter, (err, data) => {
        // console.log(data);
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
        //   console.log(data);
        if (data) {
          reject();
        } else {
          resolve(data);
        }
      });
    });
  },
  createUser: data => {
    //   console.log("inserting data",data)
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
          console.log("mail sent");
          let { _id } = result;
          resolve({ _id });
        } else {
          reject();
        }
      });
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
    console.log("HERE data is ", data);
    return new Promise((resolve, reject) => {
      db.findOneAndUpdate(
        data,
        { $set: { verify: true } },
        { new: true },
        (err, data) => {
          if (data) {
            console.log("resolving");
            resolve(data);
          } else {
            console.log("rejecting");
            reject();
          }
        }
      );
    });
  }
};
