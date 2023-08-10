const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');


class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,    
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    date_posted: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment