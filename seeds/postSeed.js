const { Post } = require('../models');

const postData = 
    {
      "id" : 0,
      "title": "Test",
      "content": "Blog Body",
      "date_posted": "2023/09/08",
      "user_id": 1
    }
  

const seedPosts = () => Post.create(postData);

module.exports = seedPosts;
