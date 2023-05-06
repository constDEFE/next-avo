import { type NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "@/utils/auth";
import { getEmailById, getUsersFriendsEmails } from "@/utils/db";
import { db } from "@/utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";

export const POST = async (request: NextRequest) => {
	try {
		const { message, chatId } = await request.json();
		const session = await getServerSession(AuthOptions);

		if (!session) {
			return NextResponse.json("Unauthorized", { status: 401 });
		}

		if (!message || !chatId) {
			return NextResponse.json("Bad Request", { status: 400 });
		}

		if (message.length > 2048) {
			return NextResponse.json("Message is too long", { status: 422 });
		}

		const [userId1, userId2] = chatId.split("--");

		if (session.user.id !== userId1 && session.user.id !== userId2) {
			return NextResponse.json("Unauthorized", { status: 401 });
		}

		const targetId = session.user.id === userId1 ? userId2 : userId1;

		const [targetEmail, senderFriends] = (await Promise.all([
			getEmailById(targetId),
			getUsersFriendsEmails(session.user.email)
		])) as [string, string[]];

		const isFriends = senderFriends.includes(targetEmail);

		if (!isFriends) {
			return NextResponse.json("Unauthorized", { status: 401 });
		}

		const newMessageId = nanoid();
		const messageRef = doc(db, "chats", chatId, "messages", newMessageId);
		const messageToSend: Message = {
			id: newMessageId,
			createdAt: new Date().getTime(),
			senderId: session.user.id,
			content: message
		};

		await setDoc(messageRef, messageToSend);

		return NextResponse.json("OK", { status: 200 });
	} catch (e) {
		return NextResponse.json("Internal Error", { status: 500 });
	}
};
