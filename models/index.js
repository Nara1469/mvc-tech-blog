const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users have many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Posts belongs to User
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Users have many Comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// Posts have many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

// Comment belongs to Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };
