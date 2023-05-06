import type { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Providers from "@/shared/Providers";

import "./globals.css";

export const metadata: Metadata = {
	title: "Avo",
	description: "Realtime chat application built with NextJS",
	icons: "/favicon.ico"
};

const font = Noto_Sans({
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
	subsets: ["latin", "cyrillic"],
	fallback: ["sans-serif"]
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html>
			<body style={font.style}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

export default RootLayout;
