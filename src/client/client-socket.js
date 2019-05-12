import io from 'socket.io-client';

const createSocket = (url) => {
  let socket = null;
  return {
    init: () => new Promise((resolve) => {
      socket = io(url)
      socket.on("ack", () => {
        console.log("Client connected")
        resolve()
      });
    }),
    getSocket: () => socket
  }
};

export const clientSocket = createSocket("http://localhost:5000");