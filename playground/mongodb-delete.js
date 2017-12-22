//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect ti MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // deleteMany
    /*db.collection('Todos').deleteMany({text : 'Eat food'}).then((result) => {
        console.log(result.result);
    });*/

    // deleteOne
    /*db.collection('Todos').deleteOne({text : 'Eat food'}).then((result) => {
        console.log(result.result);
    });*/

    // findOneAndDelete
    /*db.collection('Todos').findOneAndDelete({completed : false}).then((result) => {
        console.log(result);
    });*/


    // Remove ID

    /*
    db.collection('Users').findOneAndDelete({_id : new ObjectID('5a3ba4ada8400c1fa17bdc0f')}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });
    */

    // Remove Duplicates

    db.collection('Users').deleteMany({name: 'David'});


    //db.close();
});