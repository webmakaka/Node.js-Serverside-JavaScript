module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('group', {
    name: {
      type: DataTypes.STRING
    },
    __id: {
      type: DataTypes.UUID,
      defautValue: DataTypes.UUIDV4
    }
  })
  return Group;
}