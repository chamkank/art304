var database = require("./database");

// query example
database.query("SELECT * from films;", (err, res) => {
    console.log(res.rows[0]);
});