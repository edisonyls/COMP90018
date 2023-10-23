import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const MenuContainer = ({ title, imageSrc, type, setType }) => {
  const handlePress = () => {
    setType(title.toLowerCase());
  };

  return (
    <TouchableOpacity
      className="items-center justify-center space-y-2"
      onPress={handlePress}
    >
      <View
        className={`w-24 h-24 p-2 shadow-sm rounded-full items-center justify-center ${
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
