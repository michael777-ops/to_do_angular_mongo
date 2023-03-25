var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to MongoDB')
});

let toDOSchema = mongoose.Schema({
  title: String,
  description: String
});

const toDoModel = mongoose.model("toDoModel", toDOSchema);


/* GET users listing. */
router.get('/', function (req, res, next) {
  toDoModel.find(function (err, todos) {
    if (err) {
      res.statusCode = 400;
      console.log('error :', err);
    }
    console.log(todos);
    res.send(todos);
  })

});

/* insert ToDo */
router.post('/', async function a (req, res, next) {
  let newTodo = new toDoModel ({
    title: req.body.title,
    description: req.body.description
  });
 await newTodo.save(function (err, newTodo) {
    if (err) {
      res.statusCode = 400;
      console.log('error :', err);
    }
    console.log("aggiunto");
  })
});

/* delete Todo*/
router.post('/delete', async function a (req, res, next) {
  let delTodo = new toDoModel ({
    _id: req.body._id
  });
  console.log(delTodo.title,delTodo.description);
 await toDoModel.deleteOne(delTodo,function (err) {
    if (err) {
      res.statusCode = 400;
      console.log('error :', err);
    }
    console.log("eliminato");
  })
});

module.exports = router;
