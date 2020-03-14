/* models/person.js */
module.exports =(sequelize, DataTypes) => {
return sequelize.define('cal_events', {
  id: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    primaryKey:true,
    autoIncrement: true,
    allowNull: false
  },
  departure: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  destination: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  start: {
    type: DataTypes.DATE,
    allowNull: false
  },
  meeting_place: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  contact: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description: {
  type: DataTypes.TEXT,
  allowNull: true
  },
  created: {
    type:DataTypes.STRING(30),
    allowNull: false
  },
  condition:{
    type:DataTypes.ENUM('모집 중','마감'),
    defaultValue:'모집 중',
    allowNull:false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
  },{
    timestamps: false,
    paranoid:false,
    tableName:'cal_events'
  });
};
