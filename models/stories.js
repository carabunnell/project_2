
// Creating our Storybook model
module.exports = function(sequelize, DataTypes) {
  var Stories = sequelize.define("Stories", {
    // The name cannot be null
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // The description cannot be null
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  Stories.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Stories.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Stories;
};