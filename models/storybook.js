module.exports = function (sequelize, DataTypes) {
    var Storybook = sequelize.define("Storybook", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        // friendsArray: {
        //     type: DataTypes.ARRAY(DataTypes.INTEGER),
        //     defaultValue: false
        //   }

    });
    Storybook.associate = function(models) {
        Storybook.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Storybook.hasMany(models.Stories, {
            foreignKey: {
                allowNull: true
            }
        });
    };
    return Storybook;
};