"use client";

import type { FC } from "react";
import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";

interface Props {
	onClick: () => void;
}

const AddFriend: FC<Props> = ({ onClick }) => {
	return (
		<Link
			className="flex items-center gap-4 p-4 font-medium hover:bg-primary-500 hover:text-accent-500"
			href="/dashboard/add"
			onClick={onClick}
		>
			<AiOutlineUserAdd size={20} />
			Add friend
		</Link>
	);
};

export default AddFriend;
