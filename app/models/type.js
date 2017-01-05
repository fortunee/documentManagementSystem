module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    title: {
      type: DataTypes.STRING,
      defaultValue: 'none',
      unique: true,
      allowNull: false
    }
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
