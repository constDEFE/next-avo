import type { FC } from "react";
import { getRelativeTime } from "@/utils/other";
import clsx from "clsx";

interface Props {
	message: Message;
	fromCurrentUser?: boolean;
	hasNextFromSame?: boolean;
}

const Message: FC<Props> = ({ message, fromCurrentUser, hasNextFromSame }) => {
	return (
		<li className={clsx("flex flex-col", fromCurrentUser ? "items-end" : "items-start")}>
			<div
				className={clsx(
					"rounded-2xl border p-2",
					fromCurrentUser ? "border-accent-700 bg-accent-600 text-white" : "border-primary-800 bg-primary-700",
					!hasNextFromSame && (fromCurrentUser ? "rounded-br-none" : "rounded-bl-none")
				)}
			>
				<p className="max-w-[768px] whitespace-pre-line chat-message">{message.content}</p>
				<span className="block text-right text-xs leading-none">{getRelativeTime(message.createdAt)}</span>
			</div>
		</li>
	);
};

export default Message;
