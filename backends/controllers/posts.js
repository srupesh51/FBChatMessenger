const Post = require('./../models/posts');
const _ = require('lodash');

exports.createPost = (req,res,next) => {
  const post = new Post(req.body);
  post.post_title = req.body.post_title;
  post.post_desc = req.body.post_desc;
  post.post_text = req.body.post_text;
  post.save().then((postDocs) => {
      res.status(200).json({
          message: 'Post successfully created!',
          postData: postDocs
      });
  }).catch((error) => {
      res.status(500).json({
        message: error.message
      });
  });
}

exports.readPosts = (req,res,next) => {
  Post.find({}).sort({date: -1 }).then((postData) => {
      res.status(200).json({
          message: 'Posts successfully fetched!',
          postData: postData
      });
  }).catch((error) => {
      res.status(500).json({
        message: error.message
      });
  });
}
