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
    type: DataTypes.STRING(70),
    allowNull: false
  },
  description: {
  type: DataTypes.TEXT,
  allowNull: true
  },
  username: {
  type: DataTypes.STRING(30),
  allowNull: false
  },
  start: {
  type: DataTypes.DATE,
  allowNull: false
  },
  end: {
  type: DataTypes.DATE,
  allowNull: false
  }
  },{
    timestamps: false,
    paranoid:false,
    tableName:'cal_events'
  });
};
