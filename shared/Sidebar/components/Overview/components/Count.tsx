"use client";

import { type FC, useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface Props {
	count: number;
	userId: string;
}

const RequestsCount: FC<Props> = ({ count: initialCount, userId }) => {
	const [count, setCount] = useState<number>(initialCount);

	useEffect(() => {
		const userRef = doc(db, "users", userId);

		const unsubscribe = onSnapshot(userRef, (doc) => {
			const userSnap = doc.data() as User;

			const declinedCount = userSnap.requests.declined.length;
			const pendingCount = userSnap.requests.pending.length;

			const requestsCount = declinedCount + pendingCount;

			setCount(requestsCount);
		});

		return () => unsubscribe();
	}, [userId]);

	return count > 0 ? <div className="grid h-5 w-5 place-items-center rounded-full bg-accent-600 text-xs text-white">{count}</div> : null
};

export default RequestsCount;
