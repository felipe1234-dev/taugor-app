import React from "react";
import { User } from "@local/interfaces/index";

export interface UserValue {
    user: User|null,
    setUser(user: User|null): void
};

export const UserContext = React.createContext<UserValue>({
    user: null,
    setUser: () => {}
});

export function UserProvider(props: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User|null>(null);
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
};