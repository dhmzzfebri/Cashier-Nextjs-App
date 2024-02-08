import sequelize from '@/config/databases';
import User from '@/model/user';
import bcrypt from 'bcrypt';
import UserService from '@/service/UserService';
export default async function POST(req, res) {
  try {
    //ambil data asli password
    const pass = req.body.password;

    // Generate salt untuk menghasilkan hash password
    const salt = bcrypt.genSaltSync(12);

    // Hash password
    const hash = bcrypt.hashSync(pass, salt);

    // Initialisasi class instance
    const userService = new UserService(sequelize, User);

    const check = await userService.find(req.body.username);
    console.log(`Count:`, check);

    if (check.length != 0) {
      return res.status(500).json({
        status: 'fail',
        message: 'User sudah terdaftar',
      });
    }

    const register = await userService.store({
        username: req.body.username,
        password: hash,
        role: req.body.role,
      });

    // http status code
    // 200 ok bisa di giunkan saat mengambil Data
    // 201 created bisa di gunakan saat menambah data
    // 500 interbal serve error

    return res.status(201).json({
      status: 'success',
      message: 'berhasil mendaftar user',
      result: register,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `GAGAL mendaftarkan user baru ${error}`,
    });
  }
}
