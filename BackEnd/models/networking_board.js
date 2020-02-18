/* models/person.js */
module.exports =(sequelize, DataTypes) => {
return sequelize.define('networking_board', {
  id: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    primaryKey:true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(70),
    allowNull: false
  },
  description: {
  type: DataTypes.TEXT,
  allowNull: true
  },
  author: {
  type: DataTypes.STRING(30),
  allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  created: {
    type:DataTypes.STRING(30),
    allowNull: false
  },
  condition:{
    type:DataTypes.ENUM('진행 중', '완료'),
    defaultValue:'진행 중',
    allowNull:false
  },
  filenum: {
  type: DataTypes.INTEGER(10),
  allowNull: false
  },
  count: {
  type: DataTypes.INTEGER(11),
  allowNull: false
  },
  class: {
  type: DataTypes.STRING(30),
  allowNull: true
  }
  },{
    timestamps: false,
    paranoid:false,
    tableName:'networking_board'
  });
};
