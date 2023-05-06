import UserInfo from "@/shared/UserInfo";
import type { FC } from "react"

interface Props {
  user: User
}

const ChatHeader: FC<Props> = ({ user }) => {
  return (
    <header className="px-4 py-2 sticky top-0 flex items-center border-b border-primary-500 bg-primary-600">
      <UserInfo user={user} />
    </header>
  );
};

export default ChatHeader;