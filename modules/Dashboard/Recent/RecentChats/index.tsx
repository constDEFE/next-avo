import type { FC } from "react";

const RecentChats: FC = () => {
	return (
		<section className="h-full">
			<div className="container px-4 pt-8">
				<h1 className="py-4 text-3xl lg:text-6xl font-black">Recent chats</h1>
				{/**
				 * @todo: implement recent chats
				 */}
				<p className="text-lg text-primary-300">Nothing to show here...</p>
			</div>
		</section>
	);
};

export default RecentChats;
