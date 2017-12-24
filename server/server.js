var express = require('express');
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var Todo = require('./models/todo');
var {User} = require('./models/user');


var app = express();

app.use(bodyParser.json());


// POST
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });

});

// GET
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (err) => {
        res.status(400).send(err);
    });


});

// GET todos/ID
app.get('/todos/:id', (req, res) => {

    var _id = req.params.id;

    if (!ObjectID.isValid(_id)) {
        return res.sendStatus(404);
    }

    Todo.findById(_id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo})
    }, (err) => {
        res.status(400).send(err);
    });


});


app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};