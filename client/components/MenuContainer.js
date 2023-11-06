import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const MenuContainer = ({ title, type, setType, setSelectedMenu }) => {
  const handlePress = () => {
    setType(title.toLowerCase());
    setSelectedMenu(title.toLowerCase());
  };

  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 110,
        paddingVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: type === title.toLowerCase() ? "#9747FF" : "#FFFFFF",
        shadowColor: "#000",
        marginRight: 10,
        marginBottom: 10,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View className="items-center justify-center">
        <Text
          className={`text-[16px] font-bold ${
            type === title.toLowerCase() ? "text=[black]" : "text-[#AFAFAF]"
          }`}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuContainer;
