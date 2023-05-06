declare interface User {
	id: string;
	name: string;
	email: string;
	image: string;
	friends: string[];
	requests: {
		declined: string[];
		pending: string[];
	};
}

declare interface Chat {
	id: string;
	messages: Message[];
}

declare interface Message {
	id: string;
	senderId: string;
	content: string;
	createdAt: number;
}
