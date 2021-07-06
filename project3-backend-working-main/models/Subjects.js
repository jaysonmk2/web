module.exports =(sequelize,DataTypes)=>{

    const Subjects = sequelize.define("Subjects",{

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
    
        }
    
    
    
    
    
     })
     Subjects.associate = (models) =>{
        Subjects.hasMany(models.Rooms, {
            onDelete: "cascade"
        })
     }
     
     return Subjects;
}



