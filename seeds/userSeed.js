const { User } = require('../models');
const bcrypt = require('bcrypt')

const userData = 
    {
      "id": 1,
      "username": "Admin",
      "email": "sal@hotmail.com",
      "password": "DoNotSteal"
    }
  
const seedUsers = () => User.create(userData);

module.exports = seedUsers;
