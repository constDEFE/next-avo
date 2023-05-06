"use client";

import { type FC, useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { HiCheck } from "react-icons/hi";
import { MdClose } from "react-icons/md";

interface Props {
	requests: string[];
	type: "pending" | "declined";
	userId: string;
}

const List: FC<Props> = ({ requests: initialRequests, type, userId }) => {
	const [requests, setRequests] = useState<string[]>(initialRequests);

	const handleDecline = (emailToDecline: string) => async () => {
		const res = await fetch("/api/friends/decline", {
			method: "POST",
			body: JSON.stringify({ email: emailToDecline }),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const message = await res.json();

		if (res.ok) {
			toast.success("Declined!");
		} else {
			toast.error(message);
		}
	};

	const handleAccept = (emailToAccept: string) => async () => {
		const res = await fetch("/api/friends/accept", {
			method: "POST",
			body: JSON.stringify({ email: emailToAccept }),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const message = await res.json();

		if (res.ok) {
			toast.success("Accepted!");
		} else {
			toast.error(message);
		}
	};

	useEffect(() => {
		const ref = doc(db, "users", userId);

		const unsubscribe = onSnapshot(ref, (snap) => {
			const { requests } = snap.data() as User;
			const requestsToSet = type === "declined" ? requests.declined : requests.pending;

			setRequests(requestsToSet);
		});

		return () => unsubscribe();
	}, [type, userId]);

	return (
		<ul className="flex flex-auto flex-col gap-2 overflow-y-auto pb-4">
			{requests.map((email) => (
				<li
					className="bg-primary-600-100 flex w-full max-w-[320px] items-center justify-between rounded-xl border border-primary-500 px-2 py-4 duration-150 ease-out hover:border-accent-600 hover:text-accent-600"
					key={email}
				>
					<p className="text-sm font-semibold">{email}</p>
					<div className="flex gap-2 text-primary-100">
						<button
							onClick={handleAccept(email)}
							className="grid h-7 w-7 place-items-center rounded-full bg-accent-600 hover:bg-accent-700"
						>
							<HiCheck size={22} />
						</button>
						{type === "pending" && (
							<button
								onClick={handleDecline(email)}
								className="grid h-7 w-7 place-items-center rounded-full bg-red-600 hover:opacity-80"
							>
								<MdClose size={22} />
							</button>
						)}
					</div>
				</li>
			))}
		</ul>
	);
};

export default List;
