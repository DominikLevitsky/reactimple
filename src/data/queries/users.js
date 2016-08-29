import {
	GraphQLString as StringType,
	GraphQLInt as IntType,
	GraphQLList as List
} from 'graphql';

import { User } from '../models';
import userType from '../types/userType';

const users = {
	type: new List(userType),
	args: {
		id: {
			type: IntType
		}
	},
	resolve(root, args) {
		return User.findAll({where:args});
	}
}

export default users;
