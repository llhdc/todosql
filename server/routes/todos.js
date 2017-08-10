const express = require("express");
const router = express.Router();
const models = require("../models");
const Todos = models.todo;

router.get("/", (req, res) => {
  Todos.findAll()
  .then(todos => {
    res.render("todos/index", { todos: todos });
  })
  .catch(err => {
    throw(err);
  })
});

router.get("/:id", (req, res) => {
  Todos.findById(req.params.id)
  .then(todo => {
    res.render("todos/show", { todo: todo });
  })
})

router.post("/add", (req, res) => {
  Todos.create({
    description: req.body.addTodo,
    completed: false
  })
  res.redirect("/todos");
})

router.post("/:id/done", (req, res) => {
  Todos.findById(parseInt(req.params.id))
  .then(todo => {
    todo.update({ completed: true});
  })
  .then(todo => {
    res.redirect("/todos");
  })
  .catch(err => {
    throw (err);
  })
})

router.post("/:id/undo", (req, res) => {
  Todos.findById(parseInt(req.params.id))
  .then(todo => {
    todo.update({ completed: false});
  })
  .then(todo => {
    res.redirect("/todos");
  })
  .catch(err => {
    throw (err);
  })
})

router.post("/:id/delete", (req, res) => {
  Todos.findById(parseInt(req.params.id))
  .then(todo => {
    todo.destroy();
  })
  .then(todo => {
    res.redirect("/todos");
  })
  .catch(err => {
    throw (err);
  })
})

router.get("/:id/edit", (req, res) => {
  Todos.findById(parseInt(req.params.id))
  .then(todo => {
    res.render("todos/edit", { todo: todo });
  })
})

router.post("/:id/edit", (req, res) => {
  console.log(req.body)
  Todos.findById(parseInt(req.params.id))
  .then(todo => {
    todo.update({ description: req.body.editTodo });
  })
  .catch(err => {
    throw (err);
  })
  res.redirect("/todos");
})


// to put todos in separate arrays for the view, forEach through all and if completed put in completed array if not the..

module.exports = router;
