'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubComment = sequelize.define('SubComment', {
    content: DataTypes.TEXT,
    post_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER
  }, {});
  SubComment.associate = function(models) {
    // associations can be defined here
    SubComment.belongsTo(models.Comment, { foreignKey: 'comment_id' })
  };
  return SubComment;
};
