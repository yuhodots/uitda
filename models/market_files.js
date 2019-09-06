module.exports =(sequelize, DataTypes) => {

return sequelize.define('market_files', {
  board_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  file_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  filename: {
  type: DataTypes.STRING(70),
  allowNull: false
  },
  location: {
  type: DataTypes.TEXT,
  allowNull: true
  }
  },{
    timestamps: false,
    paranoid:false,
    tableName:'market_files'
  });
};
