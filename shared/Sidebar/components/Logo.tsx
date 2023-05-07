"use client";

import { type FC, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import Avo from "@/public/avo.png";

interface Props {
  onClick: () => void;
}

const Logo: FC<Props> = memo(({ onClick }) => {
	return (
		<Link onClick={onClick} href="/dashboard" className="mt-2 ml-4 py-2 px-3 flex items-center rounded-full bg-accent-600 duration-150 ease-out hover:bg-accent-500">
			<Image src={Avo} className="w-8 h-8" alt="Avo" />
			<span className="font-bold text-lg text-white">Avo</span>
		</Link>
	);
});

export default Logo;
