const express = require("express")
const app = express()


const http = require("http")
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  }
})

const PORT = 5001

//クライアントと通信
io.on("connection",(socket) => {
  console.log("クライアントに接続しました")

  //クライアントへ送信
  socket.on("send_message",(data) => {
    console.log(data)

    //クライアントへ送信
    io.emit("received_message",data)
  })

  socket.on("disconnect",() => {
    console.log("クライアントとの接続が切れました。")
  })
})

server.listen(PORT,() => console.log(`server is running on ${PORT}`))