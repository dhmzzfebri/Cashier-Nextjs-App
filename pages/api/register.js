import sequelize from "@/config/databases";
import User from "@/model/user";
import bcrypt from "bcrypt";
import UserService from "@/service/UserService";

export default async function POST(req,res){
    try{
        // Ambil data asli password
        const pass = req.body.password
        // Generate Salt untuk menghasilkan hash password
        const salt = bcrypt.genSaltSync(12)
        // Hash Password
        const hash = bcrypt.hashSync(pass,salt)
        // Inisialisasi class instance
        const userService = new UserService(sequelize,User)
        // Query Select
        const check = await userService.find(req.body.username)

        if(check.length !=0 ){
            return res.status(500).json({
                status: "fail",
                message: "User sudah terdaftar"
            })
        }  
        // Query Insert
        const register = await userService.store({
            username: req.body.username,
            // bukan req.body.password karna enkripsi
            password: hash,
            role: req.body.role
        })

        return res.status(201).json({
            status: "success",
            message: "BERHASIL mendaftarkan user baru",
            result: register,
            URL: '/login'
        })

    } catch(error) {
        console.log(error)
        return res.status(500).json({
            message: `GAGAL mendaftarkan user baru ${error}`
        })
    }
}