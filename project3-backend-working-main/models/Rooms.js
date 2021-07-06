module.exports =(sequelize,DataTypes)=>{

    const Rooms = sequelize.define("Rooms",{

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
    
        }
    
    
    
    
    
     })
     Rooms.associate= (models) =>{
        Rooms.hasMany(models.Recordings, {
            onDelete: "cascade"
        })
    
            Rooms.belongsTo(models.Subjects)
     }
     


     return Rooms;
}