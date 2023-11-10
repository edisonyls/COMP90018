import { View, Text, Platform, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SignIn from "../screens/SignInScreen";
import Register from "../screens/RegisterScreen";
import { Entypo } from "@expo/vector-icons";
import Landing from "../screens/Landing";
import { Ionicons } from "@expo/vector-icons";
import PostOption from "../screens/PostOption";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MessageScreen from "../screens/MessageScreen";
import FollowerScreen from "../screens/FollowersScreen";

const Tab = createBottomTabNavigator();

const RootTab = ({ navigation }) => {
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 60,
      background: "#fff",
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className="items-center justify-center">
                <Entypo
                  name="home"
                  size={24}
                  color={focused ? "#6D28D9" : "#111"}
                />
                <Text
                  className={`text-[12px] ${
                    focused ? "text-[#6D28D9]" : "text-[#111]"
                  }`}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className="items-center justify-center">
                <Entypo
                  name="map"
                  size={24}
                  color={focused ? "#6D28D9" : "#111"}
                />
                <Text
                  className={`text-[12px] ${
                    focused ? "text-[#6D28D9]" : "text-[#111]"
                  }`}
                >
                  Map
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Add"
        component={PostOption}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("PostOption")}
              >
                <View
                  style={{
                    top: Platform.OS == "ios" ? -10 : -20,
                    width: Platform.OS == "ios" ? 50 : 60,
                    height: Platform.OS == "ios" ? 50 : 60,
                    borderRadius: Platform.OS == "ios" ? 25 : 30,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#6D28D9",
                  }}
                >
                  <Entypo name="plus" size={24} color="#fff" />
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />

      <Tab.Screen
        name="FollowersScreen"
        component={FollowerScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("FollowersScreen")}
              >
                <View className="items-center justify-center">
                  <Entypo
                    name="chat"
                    size={24}
                    color={focused ? "#6D28D9" : "#111"}
                  />
                  <Text
                    className={`text-[12px] ${
                      focused ? "text-[#6D28D9]" : "text-[#111]"
                    }`}
                  >
                    Notification
                  </Text>
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className="items-center justify-center">
                <Ionicons
                  name="person"
                  size={24}
                  color={focused ? "#6D28D9" : "#111"}
                />
                <Text
                  className={`text-[12px] ${
                    focused ? "text-[#6D28D9]" : "text-[#111]"
                  }`}
                >
                  Profile
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTab;
