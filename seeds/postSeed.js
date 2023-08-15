const { Post } = require('../models');

const postData = 
    {
      "title": "Test",
      "content": "Blog Body",
      "date_posted": "2023/09/08",
      "user_id" : 1,
      "user_name": "Sal"
    }
  

const seedPosts = () => Post.create(postData);

module.exports = seedPosts;
