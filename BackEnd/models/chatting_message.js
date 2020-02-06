/* models/chatting_content.js */
module.exports =(sequelize, DataTypes) => {
return sequelize.define('chatting_message', {
  id: { //고유 채팅 번호
    type: DataTypes.INTEGER(11).UNSIGNED,
    primaryKey:true,
    autoIncrement: true,
    allowNull: false
  },
  room_id: { //고유 채팅 번호
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: false
  },
  description: { //채팅 내용
    type: DataTypes.TEXT,
    allowNull: true
  },
  author: { //작성자
    type: DataTypes.STRING(30),
    allowNull: false
  },
  created: { //작성 시간
    type:DataTypes.STRING(30),
    allowNull: false
  }
  },{
    timestamps: false,
    paranoid:false,
    tableName:'chatting_message'
  });
};

//room_id description author created
