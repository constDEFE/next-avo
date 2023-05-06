import { type Session, getServerSession } from "next-auth";
import type { Metadata } from "next";
import { AuthOptions } from "@/utils/auth";
import { getChatMessages, getUserById } from "@/utils/db";
import { notFound } from "next/navigation";
import ChatHeader from "@/modules/Dashboard/Chat/ChatHeader";
import ChatInput from "@/modules/Dashboard/Chat/ChatInput";
import Messages from "@/modules/Dashboard/Chat/Messages";

export const generateMetadata = async ({ params: { chatId } }: Props): Promise<Metadata> => {
	const session = (await getServerSession(AuthOptions)) as Session;
	const [userId1, userId2] = chatId.split("--");

	const partnerId = session.user.id === userId1 ? userId2 : userId1;
	const partner = await getUserById(partnerId) as User;

	return {
		title: `Avo | ${partner.name}`
	}
}

interface Props {
	params: {
		chatId: string;
	};
}

const Page = async ({ params: { chatId } }: Props) => {
	const session = (await getServerSession(AuthOptions)) as Session;
	const [userId1, userId2] = chatId.split("--");

	if (session.user.id !== userId1 && session.user.id !== userId2) notFound();

	const partnerId = session.user.id === userId1 ? userId2 : userId1;

	const [partner, initialMessages] = await Promise.all([
		getUserById(partnerId),
		getChatMessages(chatId),
	]) as [User, Message[]];

	return (
		<div className="flex h-full max-h-screen flex-col justify-between">
			<ChatHeader user={partner} />
			<Messages chatId={chatId} currentUserId={session.user.id} messages={initialMessages} />
			<ChatInput chatId={chatId} partner={partner} />
		</div>
	);
};

export default Page;
