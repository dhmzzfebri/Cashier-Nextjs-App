class UserService {
    constructor(sequelize, user_model) {
        this.sequelize = sequelize;
        this.user_model = user_model;
    }

    async store(data) {
        try {
            // Konek database.
        await this.sequelize.authenticate();

        //  Migrate Up.
        await this.sequelize.sync();

        // Masukkan data ke database.
        // INSERT INTO table_name VALUES.
        const response = await this.user_model.create({
            username: data.username,
            password: data.password,
            role: data.role,
        });
        
            // Kembalikan nilai data dari response.
            return response;
        } catch(err) {
            // Jika error, kembalikan nilai error.
            return err;
        }
    };

    async find(username) {
        try {
             // Query untuk mencari akun user berdasarkan username.
            const user = await this.user_model.findAll({
                where: {
                    username: username,
                }
            });
            // Query di atas sama saja dengan:
            // SELECT * from users WHERE username = 'username';

            return user;

      } catch(err) {
        // Jika terdapat error, kembalikan nilai error
        return err;
      }


    }
};

export default UserService;