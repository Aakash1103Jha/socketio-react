import React, { useState } from "react"
import styles from "./App.module.css"
import { io } from "socket.io-client"
import Chat from "./Components/Chat/Chat"

const socket = io.connect("http://localhost:4000")

const App = () => {
	const [isChatVisible, setIsChatVisible] = useState(false)
	const [chatRooms, setChatRooms] = useState("")

	const joinRoom = (roomName) => {
		socket.emit("join", roomName)
		setIsChatVisible(true)
		setChatRooms(roomName)
	}

	return (
		<main className={styles.App}>
			<div className={styles.wrapper}>
				<section onClick={() => joinRoom("Flutter")} className={styles.chatroom}>
					Flutter
				</section>
				<section onClick={() => joinRoom("React")} className={styles.chatroom}>
					React
				</section>
			</div>
			<div className={styles.wrapper}>
				<Chat isChatVisible={isChatVisible} socket={socket} room={chatRooms} />
			</div>
		</main>
	)
}

export default App
