import React, { useContext } from "react";
import { UsersContext, User } from "@context/index";

import styles from "./styles.module.scss";

export function Groups() {
  const { loading, users } = useContext(UsersContext);

  if (loading) {
    return <div>Loading ...</div>;
  }

  const filteredGroup = (accessType: "admin" | "standard") =>
    users.filter((user) => user.accessType === accessType);

  return (
    <div className={styles.groups}>
      {filteredGroup("standard").length > 0 ? (
        <section>
          <h2 className={styles.groupHeading}>Standard</h2>
          <ul className={styles.switchList}>
            {filteredGroup("standard").map((user) => (
              <ListItem
                id={user.id}
                first={user.first}
                last={user.last}
                role={user.role}
              />
            ))}
          </ul>
        </section>
      ) : null}
      {filteredGroup("admin").length > 0 ? (
        <section>
          <h2 className={styles.groupHeading}>Admins</h2>
          <ul className={styles.switchList}>
            {filteredGroup("admin").map((user) => (
              <ListItem
                id={user.id}
                first={user.first}
                last={user.last}
                role={user.role}
              />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function ListItem({
  id,
  first,
  last,
  role,
}: Pick<User, "id" | "first" | "last" | "role">) {
  return (
    <li key={id}>
      {`${first} ${last}`}
      <span className={styles.tag}>{role}</span>
    </li>
  );
}
