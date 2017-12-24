const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const Todo = require('./../server/models/todo');
const User = require('./../server/models/user');

/*
var id = '5ad3e8b95bf926a311598ebfa';

if(!ObjectID.isValid(id)){
    console.log('ID not valid');
}


Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos)
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo)
});

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by ID', todo)
}).catch((e) => console.log(e));

*/

//User.findbyID

User.findById('5a3d46461f30e68585e51f81').then((user) => {
    if (!user) {
        return console.log('Unable to find user');
    }

    console.log('User by ID', user)
}).catch((e) => {

    console.log(e)
});