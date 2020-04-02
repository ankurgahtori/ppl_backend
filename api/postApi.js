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
        .populate("comments.commentedBy")
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
  getAllPosts: (limit, skip, desiredCategory, sortBasedOn, sortingOrder) => {
    let selectionFilter =
      desiredCategory === "Fake_ID" ? {} : { category: desiredCategory };
    let sortingFilter = sortBasedOn === "date" ? { date: sortingOrder } : null;
    if (sortingFilter) {
      return new Promise((resolve, reject) => {
        db.find(selectionFilter)
          .sort(sortingFilter)
          .skip(parseInt(skip))
          .limit(parseInt(limit))
          .populate("category")
          .populate("postedBy")
          .populate("comments.commentedBy")
          .exec((err, posts) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              console.log(posts);
              resolve(posts);
            }
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        db.aggregate([
          { $match: selectionFilter },
          {
            $project: {
              title: 1,
              like: 1,
              category: 1,
              comments: 1,
              postedBy: 1,
              image: 1,
              date: 1,
              length: { $size: "$" + sortBasedOn }
            }
          },
          {
            $sort: { length: -1 }
          },
          {
            $skip: parseInt(skip)
          },
          {
            $limit: parseInt(limit)
          }
        ]).exec((err, posts) => {
          if (err) {
            console.log("error", err);
            reject(err);
          } else {
            console.log("reosle", posts);
            resolve(posts);
          }
        });
      });
    }
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
  }
};
