import type { FC } from "react";
import Link from "next/link";

interface Props {
	href: string;
	name: string;
	onClick: () => void;
}

const Chat: FC<Props> = ({ href, name, onClick }) => {
	return (
		<li>
			<Link
				className="block truncate p-4 font-medium hover:bg-primary-500 hover:text-accent-500"
				onClick={onClick}
				href={href}
			>
				{name}
			</Link>
		</li>
	);
};

export default Chat;
