module.exports = (sequelize, DataTypes) => {
    const t_login = sequelize.define(
        "t_login",
        {
            f_sno: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            f_userName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            f_Pwd: {
                type: DataTypes.STRING,
                allowNull: true
            },

        },
        {
            timestamps: false,
        }
    );
    return t_login;
};
