import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignInScreen";
import Register from "../screens/RegisterScreen";
import Landing from "../screens/Landing";
import RootTab from "./RootTab";
import PostOption from "../screens/PostOption";

import FindMyPet from "../screens/FindMyPet";
import FindLostPet from "../screens/FindLostPet";
import GeneralPost from "../screens/GeneralPost";

import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AccountScreen from "../screens/AccountScreen";
import VerifyScreen from "../screens/VerifyScreen";


import NotificationScreen from "../screens/NotificationScreen";
import SecurityScreen from "../screens/SecurityScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import MessageScreen from "../screens/MessageScreen";
import ActivitiesScreen from "../screens/ActivitiesScreen";
import PostScreen from "..//screens/PostScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingsScreen from "../screens/FollowingsScreen";
import OthersProflie from "../screens/OthersProfile";
import { useEffect } from 'react';
import { BackHandler } from 'react-native';


const Stack = createNativeStackNavigator();

const RootStack = () => {
  const tertiary = "#1F2937";
  
  useEffect(() => {
    const backAction = () => {
      // 禁止返回到 SignIn 或 Landing 页面，你可以在这里不做任何操作
      return true; // 返回 true 表示已经处理了返回按钮事件
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
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
        <Stack.Screen name="FindLostPet" component={FindLostPet} />
        <Stack.Screen name="GeneralPost" component={GeneralPost} />

        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Verify" component={VerifyScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="Activities" component={ActivitiesScreen} />
        <Stack.Screen name="Followers" component={FollowersScreen} />
        <Stack.Screen name="Followings" component={FollowingsScreen} />
        <Stack.Screen name="Others" component={OthersProflie} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
