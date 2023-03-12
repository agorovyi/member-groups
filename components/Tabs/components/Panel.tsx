import React, { FunctionComponent } from "react";
import styles from "../styles.module.scss";

interface TabPanelProps {
  id: string;
  tabId: string;
  tabIndex: number;
  selectedTab: number;
  children: React.ReactNode;
}

export const Panel: FunctionComponent<TabPanelProps> = ({
  children,
  id,
  tabId,
  tabIndex,
  selectedTab,
}) => (
  <section
    className={styles.panel}
    role="tabpanel"
    id={id}
    aria-labelledby={tabId}
    hidden={selectedTab !== tabIndex}
    tabIndex={0}
  >
    {children}
  </section>
);
