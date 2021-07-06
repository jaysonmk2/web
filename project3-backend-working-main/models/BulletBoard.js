module.exports =(sequelize,DataTypes)=>{

    const BulletBoard = sequelize.define("BulletBoard",{

        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        starttime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endtime: {
            type: DataTypes.STRING,
            allowNull: false
        }
     })
     return BulletBoard;
}