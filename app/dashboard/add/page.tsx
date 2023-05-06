import type { Metadata } from "next";
import AddFriend from "@/modules/Dashboard/Add/AddFriend";

export const metadata: Metadata = {
  title: "Avo | Add",
}

const Page = async () => {
  return (
    <>
      <AddFriend />
    </>
  );
};

export default Page;