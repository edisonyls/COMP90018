import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";

const ItemCardContainer = ({
  imageSrc,
  badge,
  petName,
  petKind,
  title,
  location,
}) => {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  return (
    <TouchableOpacity className="relative rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-[160px] h-[280px] my-2">
      <View>
        <View className="flex-row items-start space-x-1 mb-1">
          <FontAwesome name="map-marker" size={14} color="#8597A2" />
          <Text className="text-[#428288] text-[14px] font-bold">
            {location?.length > 14 ? `${location.slice(0, 14)}...` : location}
          </Text>
        </View>
        <Image
          source={imageSrc}
          className="w-full h-32 rounded-md object-cover mb-1"
        />
        <View className="flex-col items-start">
          {badge && (
            <Text
              className={`px-2 py-1 rounded-md mb-1 ${
                badge === "Missing"
                  ? "bg-red-300"
                  : badge === "Found"
                  ? "bg-purple-300"
                  : "bg-green-300"
              }`}
            >
              {badge}
            </Text>
          )}
          <Text className="mb-1">
            {petName}, {petKind}
          </Text>
          <Text className="text-[#428288] text-[16px] font-bold mb-1">
            {title?.length > 30 ? `${title.slice(0, 30)}...` : title}
          </Text>
        </View>
      </View>
      <View className="absolute bottom-2 right-2">
        <TouchableOpacity onPress={handleLike}>
          {like ? (
            <AntDesign name="heart" size={24} color="red" />
          ) : (
            <AntDesign name="hearto" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCardContainer;
