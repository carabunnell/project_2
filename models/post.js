module.exports = function(sequelize, Datatypes) {
    var Post = sequelize.define("Post", {
        title: {
            type: Datatypes. STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: Datatypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        category: {
            type: Datatypes.STRING,
            defaultValue: "Personal"
        }
    });
    return Post;
};