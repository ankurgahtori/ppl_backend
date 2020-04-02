const db = require("../schemas/categorySchema");

module.exports = {
  addCategory: data => {
    return new Promise((resolve, reject) => {
      db.create(data, (err, result) => {
        if (err) {
          reject();
        } else {
          console.log("New category added  : ", result);
          resolve(result);
        }
      });
    });
  },
  isCategoryAlreadyExist: data => {
    return new Promise((resolve, reject) => {
      db.findOne({ categoryName: data }, (err, result) => {
        if (result) {
          reject();
        } else {
          resolve();
        }
      });
    });
  },
  getCategories: () => {
    return new Promise((resolve, reject) => {
      db.find({}, (err, result) => {
        if (err) {
          reject();
        } else {
          resolve(result);
        }
      });
    });
  }
};
