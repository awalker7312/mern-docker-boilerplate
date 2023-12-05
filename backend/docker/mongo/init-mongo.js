/* global db: writable, Mongo */

db.createUser({
	user: 'mongo_user',
	pwd: 'Password123',
	roles: [
		{
			role: 'readWrite',
			db: 'mern_boilerplate'
		}
	]
});

// DB Seeding
db = new Mongo().getDB('mern_boilerplate');

db.createCollection('users', {capped: false});
