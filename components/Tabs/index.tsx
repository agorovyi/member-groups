import React, {
  useState,
  KeyboardEvent,
  RefObject,
  createRef,
  ReactNode,
} from "react";
import { Tab, Panel } from "./components";
import styles from "./styles.module.scss";

export interface TabData {
  id: string;
  title: string;
  panelComponent: ReactNode;
}

interface TabsProps {
  tabs: TabData[];
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleClick = (index: number) => {
    setSelectedTab(index);
  };

  interface TabValues extends TabData {
    ref: RefObject<HTMLAnchorElement>;
  }

  const tabValues: TabValues[] = tabs?.map((tab) => {
    const ref = createRef<HTMLAnchorElement>();
    return {
      ...tab,
      ref: ref,
    };
  });

  const handleKeyPress = (event: KeyboardEvent<HTMLUListElement>) => {
    const tabCount = tabValues.length;

    const handleNextTab = (
      firstTab: number,
      nextTab: number,
      lastTab: number
    ) => {
      const tabToSelect = selectedTab === lastTab ? firstTab : nextTab;
      setSelectedTab(tabToSelect);
      tabValues[tabToSelect].ref.current?.focus();
    };

    if (event.key === "ArrowLeft") {
      const last = tabCount - 1;
      const next = selectedTab - 1;
      handleNextTab(last, next, 0);
    }
    if (event.key === "ArrowRight") {
      const first = 0;
      const next = selectedTab + 1;
      handleNextTab(first, next, tabCount - 1);
    }
  };

  return (
    <section className={styles.container}>
      <ul role="tablist" className={styles.tablist} onKeyDown={handleKeyPress}>
        {tabValues.map((tab, index) => (
          <Tab
            key={tab.id}
            id={tab.id}
            title={tab.title}
            panelId={`${tab.id}-panel`}
            index={index}
            handleChange={handleClick}
            selectedTab={selectedTab}
            tabRef={tab.ref}
          />
        ))}
      </ul>
      {tabValues.map((tab, index) => (
        <Panel
          key={`${tab.id}-panel`}
          id={`${tab.id}-panel`}
          tabId={tab.id}
          tabIndex={index}
          selectedTab={selectedTab}
        >
          {tab.panelComponent}
        </Panel>
      ))}
    </section>
  );
};
