import {
	GraphQLSchema as Schema,
	GraphQLObjectType as ObjectType,
} from 'graphql';

import users from './queries/users';

const schema = new Schema({
	query: new ObjectType({
		name: 'Query',
		description: "This is a root query",
		fields: {
			users
		}
	})
});

export default schema;
