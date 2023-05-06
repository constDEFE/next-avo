import { type Session, getServerSession } from "next-auth";
import { AuthOptions } from "@/utils/auth";
import { getUserById } from "@/utils/db";
import Controls from "./components/Controls";

const FriendRequests = async () => {
	const session = await getServerSession(AuthOptions) as Session;
	const { requests } = (await getUserById(session.user.id)) as User;

	return (
		<section className="h-full">
			<div className="container pt-8 px-4 h-full max-h-screen flex flex-col">
				<h1 className="py-4 text-3xl lg:text-6xl font-black">Friend requests</h1>
				<Controls userId={session.user.id} requests={requests} />
			</div>
		</section>
	);
};

export default FriendRequests;
