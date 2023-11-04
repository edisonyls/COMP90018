import React from "react";
import RootStack from "./navigators/RootStack";
import { UserProvider } from "./context/userContext";

export default function App() {
  return (
    <UserProvider>
      <RootStack />
    </UserProvider>
  );
}
