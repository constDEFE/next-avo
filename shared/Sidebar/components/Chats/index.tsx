"use client";

import { type FC, useState, useEffect, memo } from "react";
import type { Session } from "next-auth";
import { createChatHref } from "@/utils/other";
import Chat from "./components/Chat";
import { db } from "@/utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { getUserByEmail } from "@/utils/db";

interface Props {
	onClick: () => void;
	user: Pick<Session, "user">;
	chats: User[];
}

const Chats: FC<Props> = memo(({ chats: initialChats, user, onClick }) => {
	const [chats, setChats] = useState<User[]>(initialChats);

	useEffect(() => {
		const ref = doc(db, "users", user.user.id);

		const unsubscribe = onSnapshot(ref, async (snap) => {
			const user = snap.data() as User;
			const friends = await Promise.all(user.friends.map(async (email) => (await getUserByEmail(email)) as User));

			setChats(friends);
		});

		return () => unsubscribe();
	}, [user.user.id]);

	return (
		<nav className="relative mt-10 h-full w-full flex-auto overflow-y-auto">
			<h2 className="sticky top-0 bg-primary-600 px-4 text-sm font-semibold text-primary-300">Your chats</h2>
			<ul className="mt-4">
				{chats.map((chat) => (
					<Chat href={createChatHref(user.user.id, chat.id)} name={chat.name} onClick={onClick} key={chat.id} />
				))}
			</ul>
		</nav>
	);
});

export default Chats;
