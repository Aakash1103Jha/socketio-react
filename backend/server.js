const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const cors = require("cors")

const app = express()
const server = http.createServer(app)

const PORT = process.env.PORT || 4000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.use(cors())

const io = new Server(server, {
	cors: {
		origin: "*",
	},
})

io.on("connection", (socket) => {
	console.log(`User ${socket.id} connected`)

	socket.on("join", (data) => {
		socket.join(data)
		console.log(`User ${socket.id} joined ${data} room`)
	})

	socket.on("send_message", (data) => {
		socket.to(data.room).emit("received_message", data)
	})

	socket.on("disconnect", () => {
		console.log(`User ${socket.id} disconnected`)
	})
})
