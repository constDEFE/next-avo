"use client";

import { type FC, useState, useCallback } from "react"
import type { Session } from "next-auth";
import clsx from "clsx";
import ToggleButton from "./components/ToggleButton";
import Logo from "./components/Logo";
import Chats from "./components/Chats";
import Overview from "./components/Overview";

interface Props {
  user: Pick<Session, "user">;
  chats: User[];
  requests: number;
}

const Sidebar: FC<Props> = ({ user, chats, requests }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);

	const cn = clsx(
		"sidebar flex w-[300px] flex-col items-start justify-between border-r border-primary-500 bg-primary-600 fixed z-10 -left-[300px] lg:left-0 duration-300 ease-out lg:static",
		isOpen && "left-0"
	);

  return (
    <header className={cn}>
      <Logo onClick={handleSidebar} />
      <Chats user={user} chats={chats} onClick={handleSidebar} />
      <Overview onClick={handleSidebar} requests={requests} user={user} />
      <ToggleButton onClick={handleSidebar} />
    </header>
  );
};

export default Sidebar;