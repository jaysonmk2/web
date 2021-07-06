module.exports =(sequelize,DataTypes)=>{

    const Recordings = sequelize.define("Recordings",{

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        extension: {
            type: DataTypes.STRING,
            allowNull: false,
            default: ".mp4"
        }
    
    
     })

     

     return Recordings;
}