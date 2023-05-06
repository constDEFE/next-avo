import type { Metadata, NextPage } from "next";
import RecentChats from "@/modules/Dashboard/Recent/RecentChats";

export const metadata: Metadata = {
	title: "Avo | Recent",
}

const Page: NextPage = () => {
	return (
		<>
			<RecentChats />
		</>
	);
};

export default Page;
