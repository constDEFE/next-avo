"use client";

import { type FC, useState, type MouseEvent } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const GoogleButton: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			await signIn("google", { callbackUrl: "/dashboard", redirect: true });
			toast("Redirecting to Google.");
		} catch (error) {
			toast.error("Something went wrong while signing in.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button
			disabled={isLoading}
			onClick={handleClick}
			className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 p-2 font-medium duration-150 ease-out hover:bg-primary-400"
		>
			{isLoading ? <span className="loader sm" /> : <FaGoogle size={22} />}
			Google
		</button>
	);
};

export default GoogleButton;
