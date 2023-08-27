const { Post } = require('../models');

const postData = 
    {
      "id" : 1,
      "title": "Test",
      "content": "Blog Body",
      "date_posted": "2023/09/08",
      "poster_id" : 1,
      "poster_name": "Admin"
    }
  

const seedPosts = () => Post.create(postData);

module.exports = seedPosts;
