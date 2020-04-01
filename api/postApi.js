const db = require("../schemas/postSchema");

module.exports = {
  getPostByID: data => {
    return new Promise((resolve, reject) => {
      db.findOne(data)
        .populate("category")
        .populate("postedBy")
        .populate("comments.commentedBy")
        .exec((err, post) => {
          if (err) {
            reject();
          } else {
            resolve(post);
          }
        });
    });
  },
  addPost: data => {
    return new Promise((resolve, reject) => {
      db.create(data)
        .populate("category")
        .populate("postedBy")
        .populate("comments.commentedBy")
        .exec((err, post) => {
          if (err) {
            reject();
          } else {
            resolve(post);
          }
        });
    });
  },
  addComment: (commentObject, postID) => {
    return new Promise((resolve, reject) => {
      db.findOneAndUpdate(
        postID,
        { $push: { comments: commentObject } },
        { new: true }
      )
        .populate("postedBy")
        .populate("comments.commentedBy")
        .exec((err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(err);
          }
        });
    });
  },
  getPost: (limit, skip, field, order) => {
    return new Promise((resolve, reject) => {
      console.log(limit, skip);
      db.find({})
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .populate("category")
        .populate("comments.commentedBy")
        .exec((err, posts) => {
          if (err) {
            reject(err);
          } else {
            resolve(posts);
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
            { new: true }
          )
            .populate("category")
            .populate("postedBy")
            .populate("comments.commentedBy")
            .exec((err, post) => {
              if (err) {
                reject();
              } else {
                resolve(post);
              }
            });
        } else {
          db.findOneAndUpdate(
            { _id: postID.postID },
            { $push: { like: userID.userID } },
            { new: true }
          )
            .populate("category")
            .populate("postedBy")
            .populate("comments.commentedBy")
            .exec((err, post) => {
              if (err) {
                reject();
              } else {
                resolve(post);
              }
            });
        }
      });
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
