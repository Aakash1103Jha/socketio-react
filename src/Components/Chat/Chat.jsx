import React, { useEffect, useState } from "react"
import Bubble from "../Bubble/Bubble"
import styles from "./Chat.module.css"

const Chat = ({ room, isChatVisible, socket, user }) => {
	const [currentText, setCurrentText] = useState("")
	const [messages, setMessages] = useState([])

	const sendMessage = async (text) => {
		const messageData = {
			_id: Math.ceil(Math.random() * 100000000),
			text: text,
			sentAt: `${new Date().getHours()}:${new Date().getMinutes()}`,
			room: room,
			author: socket.id,
		}
		await socket.emit("send_message", messageData)
		setMessages((prevState) => [...prevState, messageData])
	}

	useEffect(() => {
		socket.on("received_message", (text) => {
			return setMessages((prevState) => [...prevState, text])
		})
	}, [socket])

	return (
		<section className={isChatVisible === true ? styles.chat : styles.hidden}>
			<header className={styles.header}>{room} Room</header>
			<div className={styles.messages}>
				{messages &&
					messages.map((message) => {
						return (
							<Bubble
								author={message.author}
								key={message._id}
								message={message.text}
								time={message.sentAt}
								socketId={socket.id}
							/>
						)
					})}
			</div>
			<div className={styles.newMessage}>
				<input
					type="text"
					placeholder="New message..."
					value={currentText}
					onChange={(event) => setCurrentText(event.target.value)}
				/>
				<button
					onClick={() => {
						sendMessage(currentText)
						setCurrentText("")
					}}>
					Send
				</button>
			</div>
		</section>
	)
}

export default Chat
