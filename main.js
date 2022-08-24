const express = require("express");
const app = express();
const path = require("path");
const { disconnect } = require("process");
const http = require("http").Server(app);
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/index.html"))
})

//attach http server to socket.io
const io = require("socket.io")(http);

//create a new connection
io.on("connection", socket => {
    console.log(socket.id);
    console.log("A user connected");
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    })
    socket.on("message", (msg) => {
        console.log(msg);
    })
    socket.emit("server", "Message from server");
})

http.listen(port, () => {
    console.log(`App listening on port ${port}`);
})









