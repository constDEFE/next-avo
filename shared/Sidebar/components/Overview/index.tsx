import { type FC, memo } from "react";
import type { Session } from "next-auth";
import UserInfo from "@/shared/UserInfo";
import Logout from "./components/Logout";
import Requests from "./components/Requests";
import AddFriend from "./components/AddFriend";

interface Props {
	user: Pick<Session, "user">;
	requests: number;
	onClick: () => void;
}

const Overview: FC<Props> = memo(({ user, requests, onClick }) => {
	return (
		<div className="w-full">
			<h2 className="px-4 text-sm font-semibold text-primary-300">Overview</h2>
			<div className="mt-4">
				<AddFriend onClick={onClick} />
				<Requests onClick={onClick} userId={user.user.id} count={requests} />
				<UserInfo className="mt-4 px-4 py-4" user={user.user}>
					<Logout />
				</UserInfo>
			</div>
		</div>
	);
});

export default Overview;
