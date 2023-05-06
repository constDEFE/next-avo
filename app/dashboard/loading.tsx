import type { FC } from "react";

const Loading: FC = () => {
	return (
		<div className="grid h-full w-full place-items-center">
			<span className="loader lg" />
		</div>
	);
};

export default Loading;
