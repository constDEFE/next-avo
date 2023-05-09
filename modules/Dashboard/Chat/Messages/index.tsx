"use client";

import { type FC, useRef, useState, useEffect } from "react";
import { rtdb } from "@/utils/firebase";
import Message from "./components/Message";
import { onValue, ref, query } from "firebase/database";

interface Props {
	messages: Message[];
	currentUserId: string;
	chatId: string;
}

const Messages: FC<Props> = ({ messages: initialMessages, currentUserId, chatId }) => {
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const scrollDownRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const q = query(ref(rtdb, `chats/${chatId}/messages`));

		const unsubscribe = onValue(q, (snap) => {
			if (!snap.exists()) return setMessages([]);

			const messagesList = snap.val() as Object;
			const newMessages = Object.values(messagesList) as Message[];
			const sortedMessages = newMessages.sort((a, b) => a.createdAt - b.createdAt);

			setMessages(sortedMessages);
		});

		return () => unsubscribe();
	}, [chatId]);

	useEffect(() => {
		scrollDownRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<main className="h-full overflow-y-auto bg-primary-600">
			<ul className="flex min-h-full flex-auto flex-col justify-end gap-1 p-2">
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
