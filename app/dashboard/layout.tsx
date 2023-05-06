import { type Session, getServerSession } from "next-auth";
import type { PropsWithChildren } from "react";
import { AuthOptions } from "@/utils/auth";
import { getRequestsCount, getUsersFriends } from "@/utils/db";
import Sidebar from "@/shared/Sidebar";

const layout = async ({ children }: PropsWithChildren) => {
	const session = (await getServerSession(AuthOptions)) as Session;
	const [chats, requests] = (await Promise.all([
		getUsersFriends(session.user.email),
		getRequestsCount(session.user.id)
	])) as [User[], number];

	return (
		<div className="flex h-screen">
			<Sidebar user={{ user: session.user }} chats={chats} requests={requests} />
			<main className="w-full h-full">{children}</main>
		</div>
	);
};

export default layout;
