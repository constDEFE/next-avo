import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	async (req) => {
		const pathname = req.nextUrl.pathname;

		const isAuth = await getToken({ req });
		const isLoginPage = pathname.startsWith("/login");

		const sensitiveRoutes = ["/dashboard"];
		const isAccessingSensitiveRoute = sensitiveRoutes.some((route) => pathname.startsWith(route));

		if (isLoginPage) {
			return isAuth ? NextResponse.redirect(new URL("/", req.url)) : NextResponse.next();
		}

		if (!isAuth && isAccessingSensitiveRoute) {
			return NextResponse.redirect(new URL("/login", req.url));
		}

		if (pathname === "/") {
			return NextResponse.redirect(new URL("/dashboard", req.url));
		}
	},
	{
		callbacks: {
			authorized: async () => true
		}
	}
);

export const config = {
	matchter: ["/", "/login", "/dashboard/:path*"]
};
