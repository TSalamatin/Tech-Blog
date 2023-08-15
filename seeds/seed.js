const sequelize = require('../config/connection');
const { User , Post, Comment } = require('../models');
const seedPosts = require('./postSeed');
const seedUsers = require('./userSeed');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();

  console.log('\n----- USERS SEEDED -----\n');

  await seedPosts();
  
  console.log('\n----- POSTS SEEDED -----\n');

  process.exit(0);
};

seedDatabase();
