import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize('tipaw', 'root', '', {
  host:'localhost',
  dialect: 'mysql'
})