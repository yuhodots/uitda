module.exports =(sequelize, DataTypes) => {
    return sequelize.define('comment', {
        id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          primaryKey:true,
          autoIncrement: true,
          allowNull: false
        },
        type_board: {
          type: DataTypes.STRING(15),
          allowNull: false
        },
        board_id: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true
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
        },
        updated: {
          type:DataTypes.STRING(30),
          allowNull: false
        },
        is_re_comment:{
          type:DataTypes.BOOLEAN,
          allowNull:false,
          defaultValue:false
        },
        parent_comment:{
          type:DataTypes.INTEGER(11).UNSIGNED,
          allowNull:true
        }
      },{
        timestamps: false,
        paranoid:false,
        tableName:'comment'
      });
    };
