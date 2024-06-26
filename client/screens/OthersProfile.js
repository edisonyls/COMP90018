// Import necessary components and hooks from React Native and other libraries
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useUserContext } from "../context/userContext";
import {
  checkFollowStatus,
  unfollowUser,
  followUser,
  queryUserInfo,
} from "../api/auth";
import { getAllPostsPerUser } from "../api/ProfileAPI";
import ItemCardContainer from "../components/ItemCardContainer";
import { AntDesign } from "@expo/vector-icons";

const OthersProfile = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { otherUser } = route.params;

  const [mainData, setMainData] = useState([]);

  const { user } = useUserContext();

  const [isFollowing, setIsFollowing] = useState(false); // State to manage follow button

  const postTypeToBadge = {
    0: "Missing",
    1: "Found",
    2: "General",
  };
  const handleMessagePress = async () => {
    setIsLoading(true);
    try {
      // 获取当前用户信息
      const currentUserInfo = await queryUserInfo(user.id);
      // 获取其他用户信息
      const otherUserInfo = await queryUserInfo(otherUser.id);

      if (currentUserInfo.success && otherUserInfo.success) {
        // 如果成功获取了信息，导航到消息页面并传递这些信息
        navigation.navigate("Message", {
          currentUser: currentUserInfo.data,
          otherUser: otherUserInfo.data,
        });
      } else {
        // 如果获取信息失败，可以在这里处理错误情况
        console.error("Failed to fetch user information");
        Alert.alert("Error", "Failed to fetch user information.");
      }
    } catch (error) {
      // 处理异常错误
      console.error("Error fetching user info:", error);
      Alert.alert(
        "Error",
        "An error occurred while trying to fetch user information."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleMarkerPress = async (post) => {
    try {
      if (userInfo) {
    
        if (userInfo.id === user.id) {
         
          navigation.navigate('Profile');
        } else {
          
          navigation.navigate('Others', { otherUser: userInfo });
        }
      }

  
    } catch (error) {
     
      setUserInfo(null);
      console.error("Error fetching user info:", error);
     
      Alert.alert(
        "Error",
        "An error occurred while trying to fetch user information."
      );
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const result = await checkFollowStatus(user.id, otherUser.id);
      if (result.success && result.data) {
        setIsFollowing(result.data === "ALREADY_FOLLOW");
      }
    };

    fetchFollowStatus();
  }, [otherUser.id, user.id]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPostsPerUser(otherUser.id);
        if (data.success) {
          setMainData(data.data);
        } else {
          console.error("Failed to fetch posts: ", data.msg);
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [otherUser.id]);

  // Function to handle follow button press
  const handleFollowPress = async () => {
    setIsLoading(true); 
    try {
      let response;
      if (isFollowing) {
        
        response = await unfollowUser(user.id, otherUser.id);
      } else {
        
        response = await followUser(user.id, otherUser.id);
      }
      
      if (response.success) {
        setIsFollowing(!isFollowing);
      } else {
     
        console.error("Failed to update follow status: ", response.message);
      }
    } catch (error) {
      console.error("Error updating follow status: ", error);
    } finally {
      setIsLoading(false); 
    }
  };

  // Function to handle message button press

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4"
            style={{ marginLeft: 20, marginBottom: 20, marginTop: 20 }}
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
              // key={backgroundUri}
              style={styles.backgroundImage}
              source={{ uri: otherUser.bgImg }}
            />

            <View style={styles.profileContainer}>
              <Image
                // key={headUri}
                style={styles.headImage}
                source={{ uri: otherUser.profile }}
              />
              <Text style={styles.profileName}>{otherUser.nickname}</Text>
            </View>
          </View>

        
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={buttonStyle(isFollowing)}
              onPress={handleFollowPress}
              activeOpacity={0.7}
            >
              <Text style={{ color: isFollowing ? "white" : "black" }}>
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={buttonStyle(false)}
              onPress={handleMessagePress}
              activeOpacity={0.7}
            >
              <Text style={{ color: "black" }}>Message</Text>
            </TouchableOpacity>
          </View>

       
          <View className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap">
            {mainData?.length > 0 ? (
              mainData.map((post) => (
                <ItemCardContainer
                  post={post}
                  navigation={navigation}
                  key={post.id}
                />
              ))
            ) : (
              <>
                <View className="w-full h-[400px] items-center space-y-8 justify-center">
                  <Image
                    source={require("../assets/logo.jpg")}
                    className="w-32 h-32 object-cover"
                  />
                  <Text className="text-2xl text-[#428288] font-semibold">
                    oops... No Data Found
                  </Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    position: "relative",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 10,
  },
  menuSection: {
    flexDirection: "row", 
    justifyContent: "space-evenly", 
    marginTop: 20, 
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    height: 198, 
  },
  headImage: {
    width: 83,
    height: 83,
    position: "absolute",
    bottom: 40, 
    borderRadius: 83 / 2,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
   
  },
  sectionContainer: {
    paddingHorizontal: 16, 
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginTop: 20,
    textAlign: "left", 
    marginBottom: 10, 
    marginLeft: 10,
  },
  sectionImage: {
    width: 350, 
    height: 45, 

    marginBottom: 40, 
    marginLeft: 20,
    resizeMode: "cover",
  },
  editIcon: {
    position: "absolute", 
    top: 10, 
    right: 10, 
  },
});

// Define styles for the buttons
const buttonStyle = (isActive) => ({
  flex: 1,
  marginHorizontal: 10,
  paddingVertical: 10,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: isActive ? "#9747FF" : "#DDD",
});

export default OthersProfile;
