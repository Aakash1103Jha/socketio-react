import React from "react"
import styles from "./Bubble.module.css"

const Bubble = ({ message, time, author, socketId }) => {
	return (
		<div className={author === socketId ? styles.outgoingWrapper : styles.incomingWrapper}>
			<div className={author === socketId ? styles.outgoingMessage : styles.incomingMessage}>
				<p className={styles.messageText}>{message}</p>
				<p className={styles.messageTime}>{time}</p>
			</div>
		</div>
	)
}

export default Bubble
