const socketIO = require("socket.io");

function configureSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("connected");

    socket.on("campgroundsChanged", () => {
      io.emit("campgroundsChanged");
    });

    socket.on("singleCampgroundChanged", (id) => {
      io.emit("singleCampgroundChanged", id);
    });
  });

  return io; // Export the io instance
}

module.exports = { configureSocket };
