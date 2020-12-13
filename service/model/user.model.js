module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        uid: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone_number: { type: Sequelize.STRING },
        skill_sets: { type: Sequelize.STRING },
        hobbies: { type: Sequelize.STRING },
    }, {
        // freezeTableName: true
    });

    return User;
}