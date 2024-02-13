import {DataTypes} from "sequelize";
import sequelize from "../config/databases";

const Product = sequelize.define("Product",{
    id:{
        type: DataTypes.INTEGER,
        autpIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    quentity:{
        type: DataTypes.INTEGER,
    },
    description:{
        type: DataTypes.STRING,
    },
    price:{
        type: DataTypes.INTEGER,
    },
});
export default Product;