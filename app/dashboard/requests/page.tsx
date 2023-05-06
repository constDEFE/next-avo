import FriendRequests from "@/modules/Dashboard/Requests/FriendRequests";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Avo | Requests",
}

const Page: NextPage = () => {
	return (
		<>
			{/* @ts-expect-error Async Server Component */}
			<FriendRequests />
		</>
	);
};

export default Page;
