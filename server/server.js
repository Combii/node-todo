require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");


const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var Todo = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, './../public')));


// POST
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    console.log(JSON.stringify(req.body));


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
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo})
    }, (err) => {
        res.status(400).send(err);
    });

});

// REMOVE todos/:id
app.delete('/todos/:id', (req, res) => {

    var _id = req.params.id;

    if (!ObjectID.isValid(_id)) {
        return res.sendStatus(404);
    }

    Todo.findByIdAndRemove(_id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo})
    }).catch((err) => {
        res.status(400).send(err);
    });


});

// Update todos/:id
app.patch('/todos/:id', (req, res) => {

    var _id = req.params.id;

    //lodash takes only those that is filtered
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(_id)) {
        return res.sendStatus(404);
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(_id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.sendStatus(404);
        }

        res.send({todo});

    }).catch((err) => {
        res.sendStatus(400);
    })

});


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};