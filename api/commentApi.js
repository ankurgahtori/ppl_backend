const db = require("../schemas/commentSchema");

module.exports = {
  addComment: data => {
    return new Promise((resolve, reject) => {
      db.create(data, (err, data) => {
        if (err) {
          reject();
        } else {
          db.findOne({ _id: data._id })
            .populate("commentBy")
            .exec((err, data) => {
              if (err) {
                reject();
              } else {
                resolve(data);
              }
            });
        }
      });
    });
  },
  getComment: data => {
    return new Promise((resolve, reject) => {
      // db.find(data, (err, data) => {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     resolve(data);
      //   }
      // });
      db.find(data)
        .populate("commentBy")
        .exec((err, comments) => {
          if (err) {
            reject();
          } else {
            resolve(comments);
          }
        });
    });
  },
  getCommentByID: data => {
    return new Promise((resolve, reject) => {
      db.find(data, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
};
