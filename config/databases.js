import { Sequelize } from 'sequelize';

// Konfigurasi database
const sequelize = new Sequelize(
  // Nama database
  'cashier-v2',
  //user database
  'root',
  //password database
  '',
  //engine database address
  {
    dialect: 'mysql',
    host: 'localhost',
  }
);
export default sequelize;
