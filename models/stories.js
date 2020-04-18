
// Creating our Storybook model
module.exports = function(sequelize, DataTypes) {
  var Stories = sequelize.define("Stories", {
    // The name cannot be null
    //header title and image
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    imgHeader: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    //first body with text and optional image
    bodyONE: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    imgBodyONE: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    //second body option with text and image
    bodyTWO: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imgBodyTWO: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Stories.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Stories.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Stories;
};

// UserProject = sequelize.define('user_project', {
//   role: Sequelize.STRING
// });
// User.belongsToMany(Project, { through: UserProject });
// Project.belongsToMany(User, { through: UserProject });
// // through is required!

// user.addProject(project, { through: { role: 'manager' }});