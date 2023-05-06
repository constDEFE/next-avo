import type { FC, ChangeEvent } from "react"

interface Props {
  tab: RequestsTab;
  handler: (event: ChangeEvent<HTMLInputElement>) => void
}

const Tabs: FC<Props> = ({ tab, handler }) => {
  return (
    <div className="flex gap-2">
      <input
        checked={tab === "pending"}
        onChange={handler}
        value="pending"
        id="pending"
        type="radio"
        name="tab"
      />
      <label className="tab-label" htmlFor="pending">Pending</label>
      <input
        checked={tab === "declined"}
        onChange={handler}
        value="declined"
        id="declined"
        type="radio"
        name="tab"
      />
      <label className="tab-label" htmlFor="declined">Declined</label>
    </div>
  );
};

export default Tabs;