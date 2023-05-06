"use client";

import type { FC } from "react";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const Logout: FC = () => {
	const handleSignOut = async () => await signOut();

	return (
		<button className="p-2 text-accent-600 duration-150 ease-out hover:text-accent-500" onClick={handleSignOut}>
			<FiLogOut size={24} />
		</button>
	);
};

export default Logout;
