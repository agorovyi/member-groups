import React, { FunctionComponent, Ref } from "react";

interface TabProps {
  id: string;
  title: string;
  selectedTab: number;
  index: number;
  panelId: string;
  handleChange: (event: any) => void;
  tabRef: Ref<HTMLAnchorElement>;
}

export const Tab: FunctionComponent<TabProps> = ({
  id,
  title,
  selectedTab,
  index,
  panelId,
  handleChange,
  tabRef,
}) => {
  const handleClick = () => handleChange(index);
  return (
    <li role="presentation">
      <a
        role="tab"
        href={`#${id}`}
        aria-selected={selectedTab === index}
        aria-controls={panelId}
        tabIndex={selectedTab === index ? 0 : -1}
        onClick={handleClick}
        ref={tabRef}
      >
        {title}
      </a>
    </li>
  );
};
