/* models/person.js */
module.exports =(sequelize, DataTypes) => {
return sequelize.define('proposal', {
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
  allowNull: true,
  defaultValue :null
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
  }
  },{
    timestamps: false,
    paranoid:false,
    tableName:'proposal'
  });
};
