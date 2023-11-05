import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignInScreen";
import Register from "../screens/RegisterScreen";
import Landing from "../screens/Landing";
import RootTab from "./RootTab";
import PostOption from "../screens/PostOption";
import FindMyPet from "../screens/FindMyPet";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AccountScreen from "../screens/AccountScreen";
import VerifyScreen from "../screens/VerifyScreen";
import FindLostPet from "../screens/FindLostPet";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const tertiary = "#1F2937";
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerShown: false,
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: "",
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="Landing"
        //initialRouteName="Profile"
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Home" component={RootTab} />
        <Stack.Screen name="PostOption" component={PostOption} />
        <Stack.Screen name="FindMyPet" component={FindMyPet} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Account" component={AccountScreen} /> 
        <Stack.Screen name="Verify" component={VerifyScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
