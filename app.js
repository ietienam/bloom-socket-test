"use strict";

var express = require("express");
let app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("socket connected");
  // socket.send('Hello!');
  // socket.emit('message', 'test');
  //Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
  // console.log(`${socket.}`);
  socket.on("Charter_Message", async (trip) => {
    console.log(`Charter_Message To ==> ${trip.driver_id}`);
    socket.broadcast.emit(`${trip.driver_id}`, trip);
  });

  socket.on("Charter_Trip_Message", async (trip) => {
    console.log(`Charter_Message To  Rider Trip==> ${trip.trip_id}`);
    socket.broadcast.emit(`${trip.trip_id}`, trip);
  });

  socket.on("Intra_Trip_Message", async (trip) => {
    console.log(`Intra_Trip_Message To ==> ${trip.trip_id}`);
    socket.broadcast.emit("message", trip);
    socket.broadcast.emit(`${trip.trip_id}`, trip);
  });

  socket.on("Inter_Trip_Message", async (trip) => {
    console.log(`Inter_Trip_Message To ==> ${trip.trip_id}`);
    socket.broadcast.emit("message", trip);
    socket.broadcast.emit(`${trip.trip_id}`, trip);
  });

  socket.on("Send_Message", async (message) => {
    console.log(`Bloom_Message To ==> ${message}`);
    socket.broadcast.emit("message", message);
    socket.broadcast.emit("bloom_message", message);
  });
});

const port = process.env.PORT || 9003;

//START SERVER
http.listen(port, () => {
  console.log(`Socket started on:${port}`);
});
