"use client";

import type { FC } from "react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import Count from "./Count";

interface Props {
	userId: string;
	count: number;
	onClick: () => void;
}

const Requests: FC<Props> = ({ count, onClick, userId }) => {
	return (
		<Link
			className="flex items-center gap-4 p-4 font-medium hover:bg-primary-500 hover:text-accent-500"
			href="/dashboard/requests"
			onClick={onClick}
		>
			<AiOutlineUser size={20} />
			Friend requests
			<Count userId={userId} count={count} />
		</Link>
	);
};

export default Requests;
