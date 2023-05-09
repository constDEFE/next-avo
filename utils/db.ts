import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { ref, query as rt_query, get } from "firebase/database";
import { db, rtdb } from "./firebase";

export const getEmailById = async (id: string) => {
	const ref = doc(db, "users", id);
	const snap = await getDoc(ref);

	if (!snap.exists()) return null;

	const user = snap.data() as User;

	return user.email;
};

export const getIdByEmail = async (email: string) => {
	const q = query(collection(db, "users"), where("email", "==", email));
	const snaps = await getDocs(q);

	if (snaps.empty) return null;

	const paths = snaps.docs.map((doc) => doc.ref.path);
	const segments = paths[0].split("/");

	return segments[segments.length - 1];
};

export const getUsersFriends = async (email: string) => {
	const q = query(collection(db, "users"), where("email", "==", email));
	const snaps = await getDocs(q);

	if (snaps.empty) return [];

	const [user] = snaps.docs.map((doc) => doc.data()) as User[];

	if (!user.friends) return [];

	const friends = await Promise.all(user.friends.map(async (email) => await getUserByEmail(email) as User));

	return friends;
};

export const getUsersFriendsEmails = async (email: string) => {
	const q = query(collection(db, "users"), where("email", "==", email));
	const snaps = await getDocs(q);

	if (snaps.empty) return [];

	const [user] = snaps.docs.map((doc) => doc.data()) as User[];

	if (!user.friends) return [];

	return user.friends;
};

export const getRequestsCount = async (id: string) => {
	const ref = doc(db, "users", id);
	const snap = await getDoc(ref);

	if (!snap.exists()) return 0;

	const user = snap.data() as User;

	if (!user.requests) return 0;

	return user.requests.pending.length + user.requests.declined.length;
};

export const getUserById = async (id: string) => {
	const ref = doc(db, "users", id);
	const snap = await getDoc(ref);

	if (!snap.exists()) return null;

	return snap.data() as User;
};

export const getUserByEmail = async (email: string) => {
	const q = query(collection(db, "users"), where("email", "==", email));
	const snaps = await getDocs(q);

	if (snaps.empty) return null;

	const users = snaps.docs.map((doc) => doc.data());

	return users[0] as User;
};

export const getChatMessages = async (chatId: string) => {
	const q = rt_query(ref(rtdb, `chats/${chatId}/messages`));
	const snap = await get(q);
	
	if (!snap.exists() || !snap.hasChildren()) return [];

	const messagesList = snap.val() as Object;
	const messages = Object.values(messagesList) as Message[]
	const sortedMessages = messages.sort((a, b) => a.createdAt - b.createdAt);

	return sortedMessages;
};