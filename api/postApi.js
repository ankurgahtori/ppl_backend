const db = require("../schemas/postSchema");

module.exports = {
  getPostByID: data => {
    return new Promise((resolve, reject) => {
      db.findOne(data, (err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject();
        }
      });
    });
  },
  addPost: data => {
    return new Promise((resolve, reject) => {
      db.create(data, (err, data) => {
        if (err) {
          reject();
        } else {
          resolve(data);
        }
      });
    });
  },
  getPost: () => {
    return new Promise((resolve, reject) => {
      db.find({}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  updateLike: (postID, userID) => {
    return new Promise((resolve, reject) => {
      let filter = { $and: [{ _id: postID.postID }, { like: userID.userID }] };
      db.findOne(filter, (err, data) => {
        if (data) {
          db.findOneAndUpdate(
            { _id: postID.postID },
            { $pull: { like: userID.userID } },
            { new: true },
            (err, result) => {
              if (err) {
                reject();
              } else {
                resolve(result);
              }
            }
          );
        } else {
          db.findOneAndUpdate(
            { _id: postID.postID },
            { $push: { like: userID.userID } },
            { new: true },
            (err, result) => {
              if (err) {
                reject();
              } else {
                resolve(result);
              }
            }
          );
        }
      });
    });
  },
  removeLike: (postID, userID) => {
    return new Promise((resolve, reject) => {
      db.findOneAndUpdate(
        { _id: postID.postID },
        { $pull: { like: userID.userID } },
        { new: true },
        (err, result) => {
          if (err) {
            reject();
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  updateDislike: (postID, userID) => {
    return new Promise((resolve, reject) => {
      db.findOneAndUpdate(
        { _id: postID.postID },
        { $addToSet: { dislike: userID.userID } },
        { new: true },
        (err, result) => {
          if (err) {
            reject();
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  removeDislike: (postID, userID) => {
    return new Promise((resolve, reject) => {
      db.findOneAndUpdate(
        { _id: postID.postID },
        { $pull: { dislike: userID.userID } },
        { new: true },
        (err, result) => {
          if (err) {
            reject();
          } else {
            resolve(result);
          }
        }
      );
    });
  }
};
