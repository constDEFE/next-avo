import type { NextPage, Metadata } from "next";
import LoginForm from "@/modules/Login/LoginForm";

export const metadata: Metadata = {
	title: "Avo | Login",
	description: "Login to your account",
}

const page: NextPage = () => {
	return (
		<main>
			<LoginForm />
		</main>
	);
};

export default page;
