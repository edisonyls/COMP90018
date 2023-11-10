import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MenuContainer from "../components/MenuContainer";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Animated, Easing } from "react-native";
import { useUserContext } from "../context/userContext";
import { getAllPosts, queryUserInfo } from "../api/auth";
import { EvilIcons } from "@expo/vector-icons";
import LoadingView from "../components/LoadingView";
import { Entypo } from "@expo/vector-icons";
import { Magnetometer } from "expo-sensors";
const RadarAnimation = React.memo(() => {
  const scaleValue = new Animated.Value(0);
  const [selectedMenu, setSelectedMenu] = useState("All");

  const animateRadar = () => {
    scaleValue.setValue(0); 
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear, 
      useNativeDriver: true, 
    }).start(() => animateRadar()); 
  };

  useEffect(() => {
    animateRadar(); 
    return () => scaleValue.stopAnimation(); 
  }, []);

  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1.8], 
  });

  const opacity = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 0.5, 0], 
  });

  return (
    <Animated.View
      style={{
        opacity,

        borderRadius: 100,
        borderWidth: 2,
        borderColor: "blue", 
        width: 200,
        height: 200,
        position: "absolute",
        transform: [{ scale }],
      }}
    />
  );
});
const MapScreen = () => {
  const [type, setType] = useState("all");
  const [selectedMenu, setSelectedMenu] = useState("all");
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  const { user, setUser } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [allPosts, setAllPosts] = useState([]); 
  const [direction, setDirection] = useState(null);
  const userLocation = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    : null;

  const handleMarkerPress = async (post) => {
    try {
      navigation.navigate("Post", { post: post });
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
    
    Magnetometer.setUpdateInterval(1000); 
    const subscription = Magnetometer.addListener((data) => {
     
      let angle = Math.atan2(data.y, data.x);
      if (angle >= 0) {
        angle = angle * (180 / Math.PI);
      } else {
        angle = (angle + 2 * Math.PI) * (180 / Math.PI);
      }
   
      angle = (angle + 180) % 360;
     
      setDirection(angle);
    });

    return () => {
     
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      setIsLocationLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setIsLoading(false);
    })();
    setIsLocationLoading(false);
  }, []);

  useEffect(() => {
    const fetchAllPosts = async () => {
      setIsPostLoading(true);
      try {
        const postsData = await getAllPosts("All");
        if (postsData && postsData.success) {
          setAllPosts(postsData.data); 
          setPosts(postsData.data); 
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setIsPostLoading(false);
    };

    fetchAllPosts();
  }, []);

  const filterPosts = (menuSelection) => {
    let postType;
    switch (menuSelection) {
      case "all":
        setPosts(allPosts);
        return;
      case "missing":
        postType = 0; 
        break;
      case "found":
        postType = 1;
        break;
      case "general":
        postType = 2;
        break;
      default:
        setPosts(allPosts);
        return;
    }
    const filtered = allPosts.filter((post) => post.postType === postType); 
    setPosts(filtered);
  };

  useEffect(() => {
    filterPosts(selectedMenu);
  }, [selectedMenu, allPosts]);
  const msg = "hi";
  const region = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      }
    : {
        
        latitude: -37.8109481,
        longitude: 144.9563753,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {isLoading ? (
        <LoadingView loading={isLoading} msg={"Map Loading..."} />
      ) : isLocationLoading ? (
        <LoadingView loading={isLocationLoading} msg={"Loading location..."} />
      ) : (
        <ScrollView>
          <View className="flex-row items-between justify-between px-8">
            <View>
              <Text className="text-[40px] text-[#0B646B] font-bold">
                {"Map"}
              </Text>
              <Text className="text-[20px] text-[#527283]">
                {user.nickname}
              </Text>
            </View>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row item-center justify-center px-8 mt-4">
              <MenuContainer
                key={"all"}
                title="All"
                type={type}
                setType={setType}
                setSelectedMenu={setSelectedMenu}
              />
              <MenuContainer
                key={"missing"}
                title="Missing"
                type={type}
                setType={setType}
                setSelectedMenu={() => setSelectedMenu("missing")}
              />
              <MenuContainer
                key={"found"}
                title="Found"
                type={type}
                setType={setType}
                setSelectedMenu={() => setSelectedMenu("found")}
              />
              <MenuContainer
                key={"general"}
                title="General"
                type={type}
                setType={setType}
                setSelectedMenu={() => setSelectedMenu("general")}
              />
            </View>
          </ScrollView>
          <MapView
            style={styles.map}
            provider={MapView.PROVIDER_GOOGLE}
            region={region}
            onMapLoaded={() => setIsLoading(false)}
          >
            {userLocation && (
              <Marker coordinate={userLocation}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    transform: [{ rotate: `${direction}deg` }], 
                  }}
                >
                  <RadarAnimation />
                  <Entypo name="direction" size={40} color="#9747ff" />
                </View>
              </Marker>
            )}
            {posts.map((post) => (
              <Marker
                key={post.id}
                coordinate={{
                  latitude: post.latitude,
                  longitude: post.longitude,
                }}
                onPress={() => handleMarkerPress(post)} 
              >
                <Image
                  source={{ uri: post.picture }}
                  style={styles.headshown}
                />
              </Marker>
            ))}
          </MapView>
          <View style={styles.userInfoContainer}>
            {userInfo && (
              <Text style={styles.nicknameText}>{userInfo.nickname}</Text>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  map: {
    height: 500, 
  },
  
  headshown: {
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 25,
    width: 50,
    height: 50,
  },
});

export default MapScreen;
