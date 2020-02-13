/* models/person.js */
module.exports =(sequelize, DataTypes) => {
return sequelize.define('market_board', {
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
  price:{
    type:DataTypes.STRING(10),
    allowNull:false,
    defaultValue:'0'
  },
  condition:{
    type:DataTypes.ENUM('판매 중', '거래 중','판매 완료'),
    defaultValue:'판매 중',
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
    tableName:'market_board'
  });
};
