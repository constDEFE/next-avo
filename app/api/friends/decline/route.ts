import { type NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "@/utils/auth";
import { getIdByEmail, getUserByEmail } from "@/utils/db";
import { db } from "@/utils/firebase";
import { validateEmail } from "@/utils/validators";
import { doc, updateDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";

export const POST = async (request: NextRequest) => {
	try {
		const { email: emailToDecline } = await request.json();
		const session = await getServerSession(AuthOptions);
		const isEmail = validateEmail(emailToDecline);

		if (!session) {
			return NextResponse.json("Unauthorized", { status: 401 });
		}

		if (!isEmail) {
			return NextResponse.json("Invalid request payload", { status: 422 });
		}

		const senderId = await getIdByEmail(emailToDecline);

		if (!senderId) {
			return NextResponse.json("User not found", { status: 404 });
		}

		const target = await getUserByEmail(session.user.email) as Required<User>;
		const targetRef = doc(db, "users", session.user.id);

		const hasDeclinedRequest = target.requests.declined.includes(emailToDecline);
		const hasPendingRequest = target.requests.pending.includes(emailToDecline);

		if (hasDeclinedRequest) {
			return NextResponse.json("Already declined", { status: 400 });
		}

		if (!hasPendingRequest) {
			return NextResponse.json("No request to decline", { status: 404 });
		}

		await updateDoc(targetRef, {
			requests: {
				pending: target.requests.pending.filter((email) => email !== emailToDecline),
				declined: [...target.requests.declined, emailToDecline]
			}
		});

		return NextResponse.json("OK", { status: 200 });
	} catch (e) {
		return NextResponse.json("Internal Error", { status: 500 });
	}
};
