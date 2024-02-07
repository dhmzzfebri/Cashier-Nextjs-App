import sequelize from "@/config/databases";
import User from "@/model/user";
import bcrypt from"bcrypt";
import UserService from "@/service/UserService";
export default async function POST(req,res){
try{
    //ambil data asli password
    const pass= req.body.password;
    
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(pass,salt);

    const userService = new UserService(sequelize,User);
    const register = await userService.store({
        username:req.body.username,
        password:hash,
        role:req.body.role,
    })

    // http status code 
    // 200 ok bisa di giunkan saat mengambil Data
    // 201 created bisa di gunakan saat menambah data 
    // 500 interbal serve error

    return res.status(201).json({
        message:"berhasil mendaftar user baru",
        result:register,
    })
    res.json(result)
}catch(error){
    console.log(error)
    return res.status(500).json({
        message:"gagal daftar user baru",
    })
}
}