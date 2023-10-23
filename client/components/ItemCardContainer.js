import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

const ItemCardContainer = ({ imageSrc, title, location }) => {
  return (
    <TouchableOpacity className="rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-[150px] h-[260px] my-2">
      <Image
        source={imageSrc}
        className="w-full h-40 rounded-md object-cover"
      />
      <Text className="text-[#428288] text-[14px] font-bold">
        {title?.length > 14 ? `${title.slice(0, 14)}...` : title}
      </Text>
      <View className="flex-row items-center space-x-1">
        <FontAwesome name="map-marker" size={20} color="#8597A2" />
        <Text className="text-[#428288] text-[14px] font-bold">
          {location?.length > 14 ? `${location.slice(0, 14)}...` : location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCardContainer;
