var express = require("express");
var cors = require("cors");
var dao = require("./DAO.js");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.static('public'));

app.get('/', function(request, response) {
    params = request.params;
    console.log(params);
    response.writeHead(200, { "content-type": "text" });
    response.write("Server running at port 5000");
    response.end();
});

app.post('/', function(request, response) {
    response.writeHead(403, { "content-type": "text" });
    response.write("Access Denied !!!");
    response.end();
})

/*app.get('/user', function(request, response) {
    param = request.query;
    console.log(param);
    var userID = param.userID;

    let userProfile = {};
    let found = false;

    for (user of userList) {
        console.log(user);
        if (user.ID == userID) {
            response.json(user);
            found = true;
            break;
        }
    }
    if (!found) {
        response.writeHead(404, { "content-type": "application/json" });
    }
    response.end();
});*/

app.post('/content', function(request, response) {
    param = request.body;
    console.log(param);
    response.write("content");
    response.end();
})

/*app.get('/users', function(request, response) {
    response = DAO.getUsers();
    response.end();
});*/

app.get('/users', dao.getUsers);

app.get('/user', dao.findUser);

app.post('/user', dao.createUser);

app.put('/user', dao.updateUser);

app.delete('/user', dao.deleteUser);

app.listen(port, function(error) {
    if (error) {
        console.log("there was an error " + error);
    } else {
        console.log("Server is up");
    }
})