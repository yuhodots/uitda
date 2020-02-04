/* models/chatting_room.js */
module.exports =(sequelize, DataTypes) => {
return sequelize.define('chatting_room', {
  id: { //고유번호
    type: DataTypes.INTEGER(11).UNSIGNED,
    primaryKey:true,
    autoIncrement: true,
    allowNull: false
  },
  title: { //채팅방 제목
    type: DataTypes.STRING(70),
    allowNull: false
  },
  author_1: { //처음 만든 사람
    type: DataTypes.STRING(30),
    allowNull: false
  },
  author_2: { //대상자
    type: DataTypes.STRING(30),
    allowNull: false
  },
  created: { //채팅방 만든 시간
    type:DataTypes.STRING(30),
    allowNull: false
  }
  },{
    timestamps: false,
    paranoid:false,
    tableName:'chatting_room'
  });
};
