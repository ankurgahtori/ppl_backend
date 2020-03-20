const db = require("../schemas/userSchema");
module.exports = {
  login: (email, password) => {
    let filter = { $and: [{ email: email }, { password: password }] };
    console.log(filter);
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
  }
};
