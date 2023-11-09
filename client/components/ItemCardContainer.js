import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { API_KEY } from "../utils/utils";
import axios from "axios";

const ItemCardContainer = ({ post, navigation }) => {
  const [like, setLike] = useState(false);
  const [location, setLocation] = useState("");

  const handleLike = () => {
    setLike(!like);
  };

  useEffect(() => {
    if (post.latitude && post.longitude) {
      getGeocode(post.latitude, post.longitude);
    }
  }, [post.latitude, post.longitude]);

  const getGeocode = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        // Typically, the formatted address you want is in the first result
        const region =
          response.data.results[0].address_components[2].short_name;
        setLocation(region);
      } else {
        setLocation("Unknown");
      }
    } catch (error) {
      setLocation("Unknown");
    }
  };

  const handleMarkerPress = async (post) => {
    try {
      navigation.navigate("Post", { post: post });
    } catch (error) {
      console.error("Error fetching user info:", error);
      Alert.alert(
        "Error",
        "An error occurred while trying to fetch user information."
      );
    }
  };

  let badge;
  if (post.postType === 0) {
    badge = "Missing";
  } else if (post.postType === 1) {
    badge = "Found";
  } else if (post.postType === 2) {
    badge = "General";
  } else {
    badge = "All";
  }

  return (
    <TouchableOpacity
      onPress={() => handleMarkerPress(post)}
      className="relative rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-[160px] h-[280px] my-2"
    >
      <View>
        <View className="flex-row items-start space-x-1 mb-1">
          <FontAwesome name="map-marker" size={14} color="#8597A2" />
          <Text className="text-[#428288] text-[14px] font-bold">
            {location.length > 14 ? `${location.slice(0, 14)}...` : location}
          </Text>
        </View>
        <Image
          source={{ uri: post.picture }}
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
            {post.petName}, {post.petKind}
          </Text>
          <Text className="text-[#428288] text-[16px] font-bold mb-1">
            {post.title?.length > 30 ? `${title.slice(0, 30)}...` : post.title}
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
