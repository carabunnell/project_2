
// Creating our Storybook model
module.exports = function(sequelize, DataTypes) {
  var Storybook = sequelize.define("Storybook", {
    // The name cannot be null
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The description cannot be null
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  return Storybook;
};