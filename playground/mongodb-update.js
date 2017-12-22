//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');


    /*db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5a3be9bf37941c27d4380740')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });*/

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5a3ba76663d8f020cfcc5e4d")
    }, {
        $set: {
            name: "David"
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });


    //db.close();
});