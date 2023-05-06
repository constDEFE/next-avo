"use client"

import {type  FC, type ChangeEvent, useState } from "react"
import Tabs from "./Tabs";
import List from "./List";

interface Props extends Pick<User, "requests"> {
  userId: string;
}

const Controls: FC<Props> = ({ requests: initialRequests, userId }) => {
  const [tab, setTab] = useState<RequestsTab>("pending");
  
	const hasPending = initialRequests.pending.length > 0;
	const hasDeclined = initialRequests.declined.length > 0;

	const handleTabChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTab(event.target.value as RequestsTab);
	};

  return (
   <>
    <Tabs handler={handleTabChange} tab={tab}  />
    <hr className="my-4 mx-4 border-primary-500" />
    {tab === "pending" ? (
      hasPending 
      ? <List userId={userId} type="pending" requests={initialRequests.pending} /> 
      : <p className="text-lg text-primary-300">Nothing to show here...</p>
    ) : tab === "declined" ? (
      hasDeclined 
      ? <List userId={userId} type="declined" requests={initialRequests.declined} />
      : <p className="text-lg text-primary-300">Nothing to show here...</p>
    ) : null}
   </>
  );
};

export default Controls;