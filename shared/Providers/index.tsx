"use client";

import type { FC, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<SessionProvider>
			<Toaster position="top-center" reverseOrder={false} />
			{children}
		</SessionProvider>
	);
};

export default Providers;
