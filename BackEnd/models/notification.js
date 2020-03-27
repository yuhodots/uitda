module.exports =(sequelize, DataTypes) => {
    return sequelize.define('notification', {
        id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          primaryKey:true,
          autoIncrement: true,
          allowNull: false
        },
        board_id:{
          type:DataTypes.INTEGER(11).UNSIGNED,
          allowNull:false
        },
        email_1:{ //보내는 사람(댓글 작성자)
          type: DataTypes.STRING(60),
          allowNull: false
        },
        email_2:{ //받는 사람(알림이 뜨는 사람)
          type: DataTypes.STRING(60),
          allowNull: false
        },
        comment_type:{
          type:DataTypes.ENUM('comment','recomment'),
          allowNull:false
        },
        created: {
          type:DataTypes.STRING(30),
          allowNull: false
        },
        is_unread:{
          type:DataTypes.BOOLEAN,
          allowNull:false,
          defaultValue:false
        }
      },{
        timestamps: false,
        paranoid:false,
        tableName:'notification'
      });
    };
//board_id, email_1, email_2, created, is_unread
