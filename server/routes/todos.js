const express = require("express");
const router = express.Router();
const models = require("../models");
const Todos = models.todo;

router.get("/", (req, res) => {
  Todos.findAll().then(todos => {
    res.render("todos/index", { todos: todos });
  });
});

router.get("/:id", (req, res) => {
  Todos.findById(req.params.id).then(todo => {
    res.render("todos/show", { todo: todo });
  });
});

router.post("/add", (req, res) => {
  Todos.create({
    description: req.body.addTodo,
    completed: false
  })
  res.redirect("/todos")
})

router.post("/:id/done", (req, res) => {
  Todos.findById(parseInt(req.params.id))
  .then(todo => {
    todo.update({ completed: true})
  })
  .then(todo => {
    res.redirect("/todos");
  })
  .catch(err => {
    throw (err)
  })
})

router.post("/:id/delete", (req, res) => {
  Todos.findById(parseInt(req.params.id))
  .then(todo => {
    todo.destroy()
  })
  .then(todo => {
    res.redirect("/todos");
  })
  .catch(err => {
    throw (err)
  })
})

router.post("/:id/edit", (req, res) => {
  Todos.findById(parseInt(req.params.id))
  .then(todo => {
    res.redirect("/todos/:id/edit")
  })
  res.redirect("/todos");
})


// to put todos in separate arrays for the view, forEach through all and if completed put in completed array if not the..

module.exports = router;
