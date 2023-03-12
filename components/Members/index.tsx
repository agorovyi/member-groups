import React, { useContext, useState } from "react";
import { UsersContext, User } from "@context/index";
import { SkeletonLoader, Switch } from "@components/index";

import styles from "./styles.module.scss";
import classNames from "classnames";

export function Members() {
  const { loading, users } = useContext(UsersContext);

  if (loading) {
    return (
      <>
        <ul className={styles.switchList}>
          {Array(8)
            .fill(0)
            .map((item) => (
              <li>
                <SkeletonLoader />
              </li>
            ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <p>Use toggles to add admin permission to a member</p>
      <ul className={styles.switchList}>
        {users.map((user) => (
          <ListItem
            id={user.id}
            first={user.first}
            last={user.last}
            role={user.role}
          />
        ))}
      </ul>
    </>
  );
}

function ListItem({
  id,
  first,
  last,
  role,
}: Pick<User, "id" | "first" | "last" | "role">) {
  const { setUsersState, users } = useContext(UsersContext);
  const [isChecked, setIsChecked] = useState(false);

  const setAccessType = (isAdmin) => {
    const modifiedUsers = users.map((user) =>
      user.id === id
        ? { ...user, accessType: isAdmin ? "admin" : "standard" }
        : user
    );
    setUsersState(modifiedUsers);
  };

  const handleClick = () => {
    setIsChecked(!isChecked);
    setAccessType(!isChecked);
  };

  const member = classNames(styles.member, {
    [styles.memberAnimate]: isChecked,
  });

  return (
    <li key={id}>
      <Switch ariaLabelledby={id} checked={isChecked} onClick={handleClick} />
      <span className={member} id={id}>
        {`${first} ${last}`}
        <span className={styles.tag}>{role}</span>
      </span>
    </li>
  );
}
