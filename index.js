const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
	assert.strictEqual(err, null); //first argument is for what we are checking and 2nd argument for what we want (expected value we are checking against); if match they will continue; if do not match (err !== null) it will fail

	console.log('Connected correctly to server');

	const db = client.db(dbname); //will connect to nucampsite DB on mongoDB server and give access to set of methods to interact with DB

	db.dropCollection('campsites', (err, result) => {
		assert.strictEqual(err, null);
		console.log('Dropped Collection', result);

		const collection = db.collection('campsites');

		collection.insertOne({ name: 'Breadcrumb Trail Campground', description: 'Test' }, (err, result) => {
			assert.strictEqual(err, null);
			console.log('Insert Document:', result.ops);

			collection.find().toArray((err, docs) => {
				assert.strictEqual(err, null);
				console.log('Found Documents:', docs);

				client.close();
			});
		});
	});
});
