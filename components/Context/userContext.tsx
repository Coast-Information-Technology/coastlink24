"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { getSingleApiRequest } from "@/lib/apiRequest";
import { getTokenFromCookies } from "@/lib/cookies";
import { IUser } from "@/lib/types";

type UserContextType = {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  loading: boolean;
  error: string | null;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  error: null,
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const token = getTokenFromCookies();
      if (!token) throw new Error("No token found");

      const userData: IUser = await getSingleApiRequest(
        "/auth/users/me/",
        token
      );
      setUser(userData);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const contextValue = useMemo(
    () => ({ user, setUser, loading, error }),
    [user, loading, error]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
