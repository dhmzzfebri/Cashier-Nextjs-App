import { DataTypes } from "sequelize";
import sequelize from "../config/databases";

const User = sequelize.define("User",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type:DataTypes.ENUM(["admin","petugas"]),
        allowNull:false,
    }
})

export default User;