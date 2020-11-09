const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const authenticate = require("../auth/authenticate-middleware.js");

function verifyRole(user) {
  return (req, res, next) => {
    if (
      req.decodedToken &&
      req.decodedToken.role &&
      req.decodedToken.role.toLowerCase() === user
    ) {
      next();
    } else {
      res.status(403).json({ message: "You must be logged in to do that" });
    }
  };
}

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, verifyRole("user"), jokesRouter);

server.get("/", (req, res) => {
  res.send("Server Running");
});
module.exports = server;
