module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations defined here
        Type.hasMany(models.Document);
      }
    }
  });
  return Type;
};
