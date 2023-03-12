import React, { SyntheticEvent, useRef } from "react";

import styles from "./styles.module.scss";

interface SwitchProps {
  ariaLabelledby: string;
  checked: boolean;
  onClick: (event: SyntheticEvent) => void;
}

export const Switch = ({
  ariaLabelledby,
  checked = false,
  onClick,
}: SwitchProps) => {
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event) => {
    onClick(event);
    switchRef.current.focus();
  };

  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-labelledby={ariaLabelledby}
      onClick={handleClick}
      className={styles.button}
      ref={switchRef}
    >
      <span className={styles.switch} />
    </button>
  );
};
