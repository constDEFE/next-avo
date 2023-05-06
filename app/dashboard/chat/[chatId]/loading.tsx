import type { FC } from "react"

const Loading: FC = () => {
  return (
    <div className="h-full w-full grid place-items-center">
      <span className="loader lg" />
    </div>
  );
};

export default Loading;