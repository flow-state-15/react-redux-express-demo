'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    post_id: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
    Comment.hasMany(models.SubComment, {
      foreignKey: 'comment_id',
      onDelete: 'CASCADE',
      hooks: true,
    })
  };
  return Comment;
};
