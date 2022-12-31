const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "Atulya02!",
    port: 5100,
})

function getUsers(request, response) {
    var q = request.query.name;
    pool.query('SELECT userid, name, age, occupation from authentication.userprofile where name = $1', [q], function(error, results) {
        if (error) {
            console.log("Error detected");
            throw error;
        } else {
            response.status(200).json(results.rows);
        }
    })
}

function findUser(request, response) {
    console.log(request.query.userid);
    const id = parseInt(request.query.userid);
    pool.query("SELECT userid, name, age, occupation FROM authentication.userprofile WHERE userid = $1", [id], function(error, results) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            //console.log("$1", [])
            response.status(200).json(results.rows);
        }
    })
}

function createUser(request, response) {
    console.log(request.body);
    const id = request.body.userid;
    const name = request.body.name;
    const age = request.body.age;
    const occupation = request.body.occupation;
    pool.query("insert into authentication.userprofile(userid, name, age, occupation) values ($1,$2,$3,$4)", [id, name, age, occupation], function(error, results) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            response.status(200).json(results.rows);
        }
    })
}

function updateUser(request, response) {
    console.log(request.body);
    const id = request.body.userid;
    const name = request.body.name;
    const age = request.body.age;
    const occupation = request.body.occupation;
    pool.query("update authentication.userprofile set name = $2, age = $3, occupation = $4 where userid = $1", [id, name, age, occupation], function(error, results) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            response.status(200).json(results.rows);
        }
    })
}

function deleteUser(request, response) {
    console.log(request.body);
    const id = request.body.userid;
    pool.query("delete from authentication.userprofile where userid = $1", [id], function(error, results) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            response.status(200).json(results.rows);
        }
    })
}

module.exports = { getUsers, findUser, createUser, updateUser, deleteUser };