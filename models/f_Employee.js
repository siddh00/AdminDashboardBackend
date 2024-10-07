module.exports = (sequelize, DataTypes) => {
  const f_Employee = sequelize.define(
    "f_Employee",
    {
      f_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      f_Image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      f_Name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      f_Email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      f_Mobile: {
        type: DataTypes.STRING,
        allowNull: true
      },
      f_Designation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      f_gender: {
        type: DataTypes.STRING,
        defaultValue: 0
      },
      f_Course: {
        type: DataTypes.STRING,
        allowNull: true
      },
      f_Createdate: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: false,
    }
  );
  return f_Employee;
};
