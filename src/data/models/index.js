import connection from '../connection';

import User from './User';

function sync(...args) {
	return connection.sync(...args);
}

export default { sync };
export { User };
