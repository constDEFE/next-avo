import type { FC, PropsWithChildren } from "react";
import type { Session } from "next-auth";
import Image from "next/image";
import clsx from "clsx";

interface Props {
	user: User | Session["user"],
	className?: string
}

const UserInfo: FC<PropsWithChildren<Props>> = ({ user, children, className }) => {
	return (
		<div className={clsx("group flex items-center gap-4", className)}>
			<div className="relative rounded-full h-10 w-10 bg-gray-200">
				<Image
					className="rounded-full"
					src={user.image || ""}
					referrerPolicy="no-referrer"
					fill
					alt="user image"
				/>
			</div>
			<div>
				<p className="font-semibold text-accent-600">{user.name}</p>
				<p className="text-sm leading-4 text-primary-300">{user.email}</p>
			</div>
			{children}
		</div>
	);
};

export default UserInfo;
