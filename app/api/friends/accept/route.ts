import { type NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "@/utils/auth";
import { getIdByEmail, getUserByEmail } from "@/utils/db";
import { db } from "@/utils/firebase";
import { createChatId } from "@/utils/other";
import { validateEmail } from "@/utils/validators";
import { doc, updateDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";

export const POST = async (request: NextRequest) => {
	try {
		const { email: emailToAccept } = await request.json();
		const session = await getServerSession(AuthOptions);
		const isEmail = validateEmail(emailToAccept);

		if (!session) {
			return NextResponse.json("Unauthorized", { status: 401 });
		}

		if (!isEmail) {
			return NextResponse.json("Invalid request payload", { status: 422 });
		}

		const targetId = session.user.id;
		const senderId = await getIdByEmail(emailToAccept);

		if (!senderId) {
			return NextResponse.json("User not found", { status: 404 });
		}

		const [target, sender] = (await Promise.all([
			getUserByEmail(session.user.email),
			getUserByEmail(emailToAccept)
		])) as [Required<User>, Required<User>];

		const targetRef = doc(db, "users", targetId);
		const senderRef = doc(db, "users", senderId);

		const hasPendingRequest = target.requests.pending.includes(emailToAccept);
		const hasDeclinedRequest = target.requests.declined.includes(emailToAccept);

		if (!hasPendingRequest && !hasDeclinedRequest) {
			return NextResponse.json("No request to accept", { status: 404 });
		} else {
			await Promise.all([
				updateDoc(targetRef, {
					friends: [...target.friends, emailToAccept],
					requests: {
						pending: hasPendingRequest
							? target.requests.pending.filter((email) => email !== emailToAccept)
							: target.requests.pending,
						declined: hasDeclinedRequest
							? target.requests.declined.filter((email) => email !== emailToAccept)
							: target.requests.declined
					}
				}),
				updateDoc(senderRef, {
					friends: [...sender.friends, target.email]
				}),
			]);
		}

		return NextResponse.json("OK", { status: 200 });
	} catch (e) {
		return NextResponse.json("Internal Error", { status: 500 });
	}
};
