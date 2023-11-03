import React from "react";
import RootStack from "./navigators/RootStack";
import { ProfileProvider } from "./navigators/ProfileContext";
export default function App() {
  return (
    <ProfileProvider>
      <RootStack />
    </ProfileProvider>
  );
}
