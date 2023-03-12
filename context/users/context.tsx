import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";

export interface User {
  first: string;
  last: string;
  role: string;
  photo: string;
  id: string;
  accessType: string;
}

interface UsersContext {
  loading: boolean;
  users: User[];
  setUsersState: Dispatch<SetStateAction<User[]>>;
}

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersContext = createContext<UsersContext>({
  loading: true,
  users: [],
  setUsersState: () => [],
});

const fetcher = (url) => fetch(url).then((res) => res.json());

export function UsersProvider({ children }: UsersProviderProps) {
  const [usersState, setUsersState] = useState<User[]>([]);
  const { data, error, isLoading } = useSWR(
    `/.netlify/functions/users`,
    fetcher
  );

  useEffect(() => {
    if (!isLoading && data) {
      setUsersState(data);
    }
  }, [isLoading, data]);

  const value = useMemo(
    () => ({
      loading: isLoading,
      users: usersState,
      setUsersState: setUsersState,
    }),
    [isLoading, usersState]
  );

  if (error)
    return (
      <div className="container">
        "An error has occurred. Please refresh the page to try again."
      </div>
    );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}
