module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('student', {
    name: {
      type: DataTypes.STRING
    },
    __id: {
      type: DataTypes.UUID,
      defautValue: DataTypes.UUIDV4
    }
  });
  Student.associate = function (models) {
    Student.belongsTo(models.teacher);
  }
  return Student;
}