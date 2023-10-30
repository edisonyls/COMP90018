import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const ProfileMenuContainer = ({ title, imageSrc, type, setType,setSelectedMenu }) => {
  const handlePress = () => {
    setType(title.toLowerCase());
    setSelectedMenu(title.toLowerCase());
  };

  return (
    <TouchableOpacity
      className="items-center justify-center space-y-2"
      onPress={handlePress}
    >
      <View
        className={`w-20 h-20 p-2 shadow-sm rounded-full items-center justify-center m-1 ${
          type === title.toLowerCase() ? "bg-gray-300" : "bg-white"
        }`}
      >
        <Image className="w-full h-full object-contain" source={imageSrc} />
        <Text className="text-[#00BCC9] text-[16px] font-semibold">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuContainer;
