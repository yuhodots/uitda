/* models/person.js */
module.exports =(sequelize, DataTypes) => {
return sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey:true,
    autoIncrement: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true
  },
  username: {
  type: DataTypes.STRING(60),
  allowNull: false,
  unique: true
  }
},{
    timestamps: false,
    paranoid:false,
    tableName:'users'
  });
};
