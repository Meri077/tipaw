import {Model, DataTypes} from 'sequelize';
import { sequelize } from './../Database.js';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    terms: DataTypes.BOOLEAN
  },
  {
    modelName: 'users',
    sequelize
  }
)
User.sync();

export default User;