const jwt = require('jsonwebtoken')
module.exports = (sequelize,DataTypes) => {

    const Users = sequelize.define("Users",{

       email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true       
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        usertype: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        firstname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phonenumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userstatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: 1
        }


    })

    Users.associate = (models)=>{
        Users.hasMany(models.Subjects, {
            onDelete: "cascade"
        })

    
    }

    return Users;
}
