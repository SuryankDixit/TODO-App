const express = require("express");
const pool = require('./db');
const bodyparser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// INDEX route:     shows all the todo tasks list
app.get("/todos", async function(req, res) {

    try {

        const allTodo = await pool.query("SELECT * FROM todo");
        // console.log(allTodo.rows);
        res.render("index", { allTodo: allTodo.rows });

    } catch (err) {

        console.error(err);
    }
});

// POST a TODO 
app.post("/todos", async function(req, res) {

    try {

        const { description } = req.body;
        let newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", [description]
        );
        res.redirect("/todos");

    } catch (err) {
        console.error(err.message);
    }
});


// SHOW ROUTE: Get Specific route:
app.get("/todos/:id", async function(req, res) {

    try {

        const { id } = req.params;
        const todo = await pool.query(
            " SELECT * FROM todo WHERE todo_id = $1", [id]
        );
        res.json(todo.rows);

    } catch (error) {
        console.log(error.message);
    }
});


app.get("/todos/:id/edit", async function(req, res) {

    try {

        // console.log(req.params);
        const { id } = req.params;
        // const { description } = req.body;
        const editTodo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1", [id]
        );
        // console.log(editTodo.rows);
        // console.log(editTodo.rows.todo_id);
        // console.log(editTodo.rows[0].description);
        res.render("edit", { editTodo: editTodo.rows[0] });

    } catch (error) {
        console.log(error.message);
    }
})


// UPDATE route:
app.put("/todos/:id", async function(req, res) {

    try {

        // console.log(req.params);
        // console.log(req.body);
        // console.log(req.body.description);
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]
        );

        res.redirect("/todos");

    } catch (error) {
        console.log(error.message);
    }
});


app.delete("/todos/:id", async function(req, res) {

    try {

        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1", [id]
        );
        res.redirect("/todos");

    } catch (error) {
        console.log(error.message);
    }
});


app.listen(10000, function() {
    console.log("Server has started");
})