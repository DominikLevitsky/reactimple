import Sequelize from 'sequelize';
import { databaseUrl } from '../config';

const connection = new Sequelize(databaseUrl, {
});

export default connection;
