import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const PostScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="flex-row justify-between items-center p-2.5 mr-2">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-4"
            >
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Image
              source={require("./../assets/dog.png")}
              className="w-10 h-10 rounded-full mr-2 border"
              style={{ borderColor: "#D3D3D3" }}
            />
            <Text className="font-bold">Username</Text>
          </View>
          <TouchableOpacity className="p-2 bg-[#007bff] rounded-lg">
            <Text className="text-white">Follow</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <View className="mt-2 items-center">
            <Image
              source={require("./../assets/dog_example_1.jpg")} // Replace with your actual image source
              style={{
                width: screenWidth - 20,
                height: screenWidth - 20,
                resizeMode: "cover",
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PostScreen;
