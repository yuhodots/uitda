module.exports =(sequelize, DataTypes) => {
    return sequelize.define('likey', {
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
        tableName:'likey'
    });
};
