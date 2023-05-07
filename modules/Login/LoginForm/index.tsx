import Image from "next/image";
import GoogleButton from "./components/GoogleButton";
import Avo from "@/public/avo.png";

const LoginForm = () => {
	return (
		<section className="grid min-h-screen place-items-center">
			<form className="w-full max-w-[380px] space-y-4 text-center p-4">
				<Image className="mx-auto w-20 h-20" src={Avo} alt="Avo" />
				<h2 className="border-b border-primary-500 py-1 text-2xl font-bold lg:text-3xl">
					Sign in to your Account
				</h2>
				<GoogleButton />
			</form>
		</section>
	);
};

export default LoginForm;
