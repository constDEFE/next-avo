import type { AuthOptions as Options } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import { cert } from "firebase-admin/app";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const CustomFirestoreAdapter = () => {
	const adapter = FirestoreAdapter({
		credential: cert({
			projectId: process.env.FIREBASE_PROJECT_ID,
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			privateKey: process.env.FIREBASE_PRIVATE_KEY
		})
	});

	return {
		...adapter,
		createUser: async (userInit: Omit<AdapterUser, "id">) => {
			const user = await adapter.createUser(userInit);
			await updateDoc(doc(db, "users", user.id), {
				id: user.id,
				friends: [],
				requests: {
					pending: [],
					declined: []
				}
			});

			return user;
		}
	};
};

export const AuthOptions: Options = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	adapter: CustomFirestoreAdapter(),
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt"
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) token.id = user.id;

			return token;
		},
		session: async ({ session, token }) => {
			session.user.id = token.id;

			return session;
		}
	},
	pages: {
		signIn: "/login"
	}
};
