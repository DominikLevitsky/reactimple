import connection from '../connection';
import Sequelize from 'sequelize';

const User = connection.define('User', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	email: {
		type: Sequelize.STRING(255),
		validate: { isEmail: true }
	}
});

export default User;
