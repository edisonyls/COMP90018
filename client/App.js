import React from "react";
import RootStack from "./navigators/RootStack";
<<<<<<< HEAD
import { ProfileProvider } from "./navigators/ProfileContext";
export default function App() {
  return (
    <ProfileProvider>
      <RootStack />
    </ProfileProvider>
=======
import { UserProvider } from "./context/userContext";

export default function App() {
  return (
    <UserProvider>
      <RootStack />
    </UserProvider>
>>>>>>> origin
  );
}
