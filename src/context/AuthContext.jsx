import { createContext, useEffect, useReducer } from "react";
/* eslint-disable react/react-in-jsx-scope */
// Safely parse localStorage item, and catch any invalid JSON
const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");

  // If the stored user exists, try parsing it
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (e) {
      console.error("Error parsing stored user JSON:", e);
      return null; // Return null if JSON is invalid
    }
  }

  return null; // Return null if no stored user
};

// Define the initial state
const INITIAL_STATE = {
  user: getUserFromLocalStorage(),
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    // Save user to localStorage if it exists, otherwise remove it
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
