import type { FC } from "react";
import Form from "./components/Form";

const AddFriend: FC = () => {
	return (
		<section className="h-full">
			<div className="container px-4 pt-8">
				<h1 className="py-4 text-3xl lg:text-6xl font-black">Add Friend</h1>
				<Form />
			</div>
		</section>
	);
};

export default AddFriend;
