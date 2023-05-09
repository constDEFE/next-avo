"use client";

import { type FC, type KeyboardEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BiPaperPlane } from "react-icons/bi";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
	partner: User;
	chatId: string;
}

const ChatInput: FC<Props> = ({ partner, chatId }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const sendMessage = async () => {
		if (loading) return;

		if (textareaRef.current) {
			setLoading(true);

			try {
				const message = textareaRef.current.value;

				if (!message) return toast.error("Do not leave empty");

				const res = await fetch("/api/messages/send", {
					method: "POST",
					body: JSON.stringify({ message, chatId }),
					headers: {
						"Content-Type": "application/json"
					}
				});

				if (!res.ok) toast.error("Something went wrong");
			} catch (e) {
				toast.error("Something went wrong");
			} finally {
				setLoading(false);
				textareaRef.current.value = "";
				textareaRef.current.focus();
			}
		}
	};

	const handleEnterKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	};

	return (
		<div className="flex items-center gap-2 border-t border-primary-500 bg-primary-600 p-3">
			<TextareaAutosize
				className="max-h-[30vh] min-h-[42px] w-full rounded-md border py-2 px-3 focus:outline-none focus:border-accent-600"
				placeholder={`Message ${partner.name}`}
				ref={textareaRef}
				onKeyDown={handleEnterKeyDown}
				maxLength={2048}
			/>
			<button
				className="h-full rounded-md bg-primary-500 px-4 h-[42px] duration-150 ease-out hover:bg-primary-400"
				type="submit"
				onClick={sendMessage}
			>
				<BiPaperPlane size={28} />
			</button>
		</div>
	);
};

export default ChatInput;
