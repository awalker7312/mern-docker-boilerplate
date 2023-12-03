// Import the React library
import React from "react";

// Create a new context using React's Context API
// The Context API allows you to share global state across multiple components without prop drilling
// In this case, we're creating a context to share authentication state and user information
// The default value of this context is null, which means that if a component tries to access this context outside of a provider, it will get null
const AuthContext = React.createContext(null);

export default AuthContext;
