import sequelize from '@/config/databases';
import UserService from '@/service/UserService';
import User from '@/model/user';
import bcrypt from 'bcrypt';

export default async function POST(req, res) {
  try {
    const userService = new UserService(sequelize, User);
    //ambil data reques
    const username = req.body.username;
    //ambil data plain password
    const password = req.body.password;
    const result = await userService.find(username);

    console.log(`username:${username}`);
    console.log(result);
    // Cek apabila user belum terdatar, maka tidak boleh login
    if (result.length == 0) {
      return res.status(400).json({
        message: 'User belum terdaftar. Silahkan register dulu',
        status: 'fail',
      });
    }

    //ambil password
    const hash = result[0].password;

    //cek apakah password benar
    const cekPassword = bcrypt.compareSync(password, hash);

    if (!cekPassword) {
      return res.status(400).json({
        message: 'password salah',
        status: 'fail',
      });
    }

    return res.status(200).json({
      message: 'berhasil login',
      status: 'success',
      token: 'string',
      dashboardURL: '/',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      message: `Terdapat error ${err}`,
    });
  }
}
