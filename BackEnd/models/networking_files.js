/* models/person.js */
module.exports =(sequelize, DataTypes) => {
return sequelize.define('networking_files', {
  board_id: {
    type: DataTypes.INTEGER(11).UNSIGNED,
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
    tableName:'networking_files'
  });
};
