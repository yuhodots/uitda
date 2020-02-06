/* models/person.js */
module.exports =(sequelize, DataTypes) => {
return sequelize.define('cal_events', {
  id: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    primaryKey:true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(50),
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
    allowNull: false
  },
  contact: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
  type: DataTypes.TEXT,
  allowNull: true
  },
  username: {
  type: DataTypes.STRING(30),
  allowNull: false
  }
  },{
    timestamps: false,
    paranoid:false,
    tableName:'cal_events'
  });
};
