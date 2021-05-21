const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
	assert.strictEqual(err, null); //first argument is for what we are checking and 2nd argument for what we want (expected value we are checking against); if match they will continue; if do not match (err !== null) it will fail

	console.log('Connected correctly to server');

	const db = client.db(dbname); //will connect to nucampsite DB on mongoDB server and give access to set of methods to interact with DB

	db.dropCollection('campsites', (err, result) => {
		assert.strictEqual(err, null);
		console.log('Dropped Collection', result);

		dboper.insertDocument(db, { name: 'Breadcrumb Trail Campground', description: 'Test' }, 'campsites', (result) => {
			console.log('Insert Document:', result.ops);

			dboper.findDocuments(db, 'campsites', (docs) => {
				console.log('Found Documents:', docs);

				dboper.updateDocument(db, { name: 'Breadcrumb Trail Campground' }, { description: 'Updated Test Description' }, 'campsites', (result) => {
					console.log('Updated Document Count:', result.result.nModified);

					dboper.findDocuments(db, 'campsites', (docs) => {
						console.log('Found Documents:', docs);

						dboper.removeDocument(db, { name: 'Breadcrumb Trail Campground' }, 'campsites', (result) => {
							console.log('Deleted Document Count:', result.deletedCount);

							client.close();
						});
					});
				});
			});
		});
	});
});
