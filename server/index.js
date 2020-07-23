const express = require("express");
const pool = require('./db');
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

// INDEX route:     shows all the todo tasks list
app.get("/todos", async function(req, res) {

    try {

        const allTodo = await pool.query("SELECT * FROM todo");
        res.send(allTodo.rows);

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
        res.json(newTodo);

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



// UPDATE route:
app.put("/todos/:id", async function(req, res) {

    try {

        const { id } = req.params;
        const { description } = req.body;
        const updataTodo = await pool.query(
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