import { useState, createContext } from "react";

const UserContext = createContext({});

function UserProvider({ children }) {
    const [user, setUser] = useState({});
    
    const extractUserData = (user) => {
        const result = {}
        
        const fields = [ 
            "uuid", 
            "displayName", 
            "photoURL",
            "phoneNumber",
            "email"
        ];
        
        fields.forEach(key => {
            result[key] = user[key];
        });
        
        return result;
    }
    
    return (
        <UserContext.Provider value={[user, (user) => setUser(extractUserData(user))]}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };