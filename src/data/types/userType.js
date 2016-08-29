import {
	GraphQLObjectType as ObjectType,
	GraphQLString as StringType,
	GraphQLInt as IntType
} from 'graphql';

const userType = new ObjectType({
	name: "User",
	description: "User object",
	fields: {
		id: {
			type: IntType,
			description: "Primary key",
			resolve(user) {
				return user.id
			}
		},
		email: {
			type: StringType,
			description: "User entered email",
			resolve(user) {
				return user.email
			}
		}
	}
});

export default userType;
