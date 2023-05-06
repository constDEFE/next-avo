import type { FC } from "react";
import { CgMenuRight } from "react-icons/cg";

interface Props {
	onClick: () => void;
}

const ToggleButton: FC<Props> = ({ onClick }) => {
	return (
		<button
			className="fixed right-2 top-2 z-10 rounded-lg bg-primary-500 p-2 duration-150 ease-out hover:bg-primary-400 focus:outline-none active:scale-95 lg:hidden"
			onClick={onClick}
		>
			<CgMenuRight size={24} />
		</button>
	);
}

export default ToggleButton;
