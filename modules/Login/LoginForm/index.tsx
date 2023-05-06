import GoogleButton from "./components/GoogleButton";

const LoginForm = () => {
	return (
		<section className="grid min-h-screen place-items-center">
			<form className="w-full max-w-[380px] space-y-4 text-center p-2">
				<h1 className="border-b border-primary-500 py-1 text-2xl font-bold lg:text-3xl">
					Sign in to your Account
				</h1>
				<GoogleButton />
			</form>
		</section>
	);
};

export default LoginForm;
