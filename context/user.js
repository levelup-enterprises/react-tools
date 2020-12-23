import React, { useReducer } from "react";
import jwt from "jwt-decode";
import session from "../services/session";
import { logout } from "../services/auth";

let reducer = (user, newUser) => {
  return { ...user, ...newUser };
};

// Set states
const initialState = getUser();

// Get user data from session
function getUser() {
  try {
    // Get user info
    const user = session.get("token") || null;
    if (user) {
      let time = jwt(user);

      // Check if expired
      time = new Date(time.exp);
      time < new Date() && logout();

      return jwt(user);
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
}

// Create contexts
const UserContext = React.createContext();

function UserProvider(props) {
  const [user, setUser] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
