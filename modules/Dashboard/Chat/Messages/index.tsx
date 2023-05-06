"use client";

import { type FC, useRef, useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Message from "./components/Message";

interface Props {
	messages: Message[];
	currentUserId: string;
	chatId: string;
}

const Messages: FC<Props> = ({ messages: initialMessages, currentUserId, chatId }) => {
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const scrollDownRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const q = query(collection(db, "chats", chatId, "messages"), orderBy("createdAt", "asc"));

		const unsubscribe = onSnapshot(q, (snaps) => {
			const messages = snaps.docs.map((doc) => doc.data() as Message);

			setMessages(messages);
		});

		return () => unsubscribe();
	}, [chatId]);

	useEffect(() => {
		scrollDownRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<main className="h-full overflow-y-auto bg-primary-600">
			<ul className="min-h-full flex flex-auto flex-col justify-end gap-1 p-2">
				{messages.map((message, i) => {
					const isCurrentUser = message.senderId === currentUserId;
					const hasNextMessageFromSameUser = messages[i]?.senderId === messages[i + 1]?.senderId;

					return (
						<Message
							key={message.id}
							message={message}
							fromCurrentUser={isCurrentUser}
							hasNextFromSame={hasNextMessageFromSameUser}
						/>
					);
				})}
			</ul>
			<span ref={scrollDownRef} />
		</main>
	);
};

export default Messages;
