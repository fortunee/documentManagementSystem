module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ownerId: DataTypes.INTEGER,
    access: {
      defaultValue: 'public',
      type: DataTypes.STRING,
      validate: {
        isIn: [['private', 'public', 'role']]
      }
    },
    typeId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: (models) => {
        // associations defined here
        Document.belongsTo(models.User, {
          as: 'Owner',
          onDelete: 'CASCADE',
          foreignKey: { allowNull: false }
        });

        Document.belongsTo(models.Type, {
          onDelete: 'CASCADE',
          foreignKey: { allowNull: true }
        });
      }
    }
  });
  return Document;
};
