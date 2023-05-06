"use client";

import { type FC, memo } from "react";
import Link from "next/link";

interface Props {
  onClick: () => void;
}

const Logo: FC<Props> = memo(({ onClick }) => {
	return (
		<Link onClick={onClick} href="/dashboard" className="mt-2 ml-4 px-4 py-2 rounded-full bg-accent-600 duration-150 ease-out hover:bg-accent-500">
			<span className="text-white text-3xl font-extrabold tracking-tight">Avo</span>
		</Link>
	);
});

export default Logo;
