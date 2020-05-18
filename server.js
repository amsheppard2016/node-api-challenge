const express = require("express");

const actionRouter = require("./data/routers/actionRouter.js");
const projectRouter = require("./data/routers/projectRouter.js");

const server = express();
server.use(express.json());
server.use(logger);

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
    res.send(`<h1>You Made It Here</h1>`);
});

function logger(req, res, next) {
    console.log(
        `${req.method} from ${req.url} on ${new Date().toLocaleString()}`
    );
    next();
}

module.exports = server;
