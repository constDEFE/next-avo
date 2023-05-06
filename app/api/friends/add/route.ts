import { type NextRequest, NextResponse } from "next/server";
import { getIdByEmail, getUserByEmail } from "@/utils/db";
import { validateEmail } from "@/utils/validators";
import { AuthOptions } from "@/utils/auth";
import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";

export const POST = async (request: NextRequest) => {
	try {
		const { email: emailToAdd } = await request.json();
		const session = await getServerSession(AuthOptions);
		const isEmail = validateEmail(emailToAdd);

		if (!session) {
			return NextResponse.json("Unauthorized", { status: 401 });
		}

		if (!isEmail) {
			return NextResponse.json("Invalid request payload", { status: 422 });
		}

		if (session.user.email === emailToAdd) {
			return NextResponse.json("Unable to send request to yourself", { status: 400 });
		}

		const targetId = await getIdByEmail(emailToAdd);

		if (!targetId) {
			return NextResponse.json("User not found", { status: 404 });
		}

		const [sender, target] = (await Promise.all([
			getUserByEmail(session.user.email), 
			getUserByEmail(emailToAdd)
		])) as [User, User];

		const targetRef = doc(db, "users", targetId);

		const isAlreadyFriends = sender.friends.includes(sender.email);
		const isAlreadySent = target.requests.pending.includes(sender.email);
		const isAlreadyDeclined = target.requests.declined.includes(sender.email);

		if (isAlreadyFriends) {
			return NextResponse.json("Already friends", { status: 400 });
		} else if (isAlreadySent) {
			return NextResponse.json("Request already sent", { status: 400 });
		} else if (isAlreadyDeclined) {
			return NextResponse.json("Request already declined", { status: 400 });
		} else {
			await updateDoc(targetRef, { "requests.pending": [...target.requests.pending, sender.email] });

			return NextResponse.json("OK", { status: 200 });
		}
	} catch (e) {
		return NextResponse.json("Internal Error", { status: 500 });
	}
};
