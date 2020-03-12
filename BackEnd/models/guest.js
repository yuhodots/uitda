module.exports =(sequelize, DataTypes) => {
    return sequelize.define('guest', {
        id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          primaryKey:true,
          autoIncrement: true,
          allowNull: false
        },
        event_id: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull: false
        },
        username: {
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
        condition:{
          type:DataTypes.ENUM('신청','승낙','거절'),
          defaultValue:'신청',
          allowNull:false
        }
      },{
        timestamps: false,
        paranoid:false,
        tableName:'guest'
      });
    };