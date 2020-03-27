/* models/chatting_room.js */
module.exports =(sequelize, DataTypes) => {
return sequelize.define('chatting_room', {
  id: { //고유번호
    type: DataTypes.INTEGER(11).UNSIGNED,
    primaryKey:true,
    autoIncrement: true,
    allowNull: false
  },
  email_1:{
    type: DataTypes.STRING(60),
    allowNull: false
  },
  email_2:{
    type: DataTypes.STRING(60),
    allowNull: false
  },
  unread_1:{
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  unread_2:{
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  online_user:{
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  updated: {
    type:DataTypes.STRING(30),
    allowNull: false
  }
  },{
    timestamps: false,
    paranoid:false,
    tableName:'chatting_room'
  });
};
//title,email_2, created
