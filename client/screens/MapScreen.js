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
import { getAllPosts, queryUserInfo } from '../api/auth';
import { EvilIcons } from '@expo/vector-icons';

const RadarAnimation = React.memo(() => {
  const scaleValue = new Animated.Value(0); // 初始值为0
  const [selectedMenu, setSelectedMenu] = useState("All");


  const animateRadar = () => {
    scaleValue.setValue(0); // 在动画开始时重置值
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1500, // 动画持续时间
      easing: Easing.linear, // 线性动画
      useNativeDriver: true, // 使用原生动画驱动
    }).start(() => animateRadar()); // 动画结束后重新开始，创建循环效果
  };

  useEffect(() => {
    animateRadar(); // 开始动画
    return () => scaleValue.stopAnimation(); // 当组件卸载时停止动画

  }, []);

  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1.8], // 可以调整输出范围来放大雷达动画
  });

  const opacity = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 0.5, 0], // 使雷达动画从半透明渐变到完全透明
  });

  return (
    <Animated.View
      style={{
        opacity,

        borderRadius: 100,
        borderWidth: 2,
        borderColor: "blue", // 雷达的颜色
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
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  const { user,setUser } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [allPosts, setAllPosts] = useState([]); // 存储从后端获取的所有帖子

  const userLocation = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    : null;

    const handleMarkerPress = async (post) => {
      try {
       
          navigation.navigate('Post', { post: post });
        
          // 如果请求不成功，设置userInfo为空并可选择显示错误信息
        
      } catch (error) {
        // 如果发生了其他类型的错误，如网络错误等，也设置userInfo为空并显示错误
        setUserInfo(null);
        console.error('Error fetching user info:', error);
        // 同样可以显示一个错误弹窗
        Alert.alert("Error", "An error occurred while trying to fetch user information.");
      }
    };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  useEffect(() => {
    (async () => {
      setIsLoading(true); // 开始加载数据
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);


    
    const fetchAllPosts = async () => {
      setIsLoading(true);
      try {
        const postsData = await getAllPosts("All");
        if (postsData && postsData.success) {
          setAllPosts(postsData.data); // 保存所有帖子
          setPosts(postsData.data); // 默认显示所有帖子
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setIsLoading(false);
    };

    fetchAllPosts();
  })();
  }, []);

  

  const filterPosts = (menuSelection) => {
    let postType;
    switch (menuSelection) {
      case "all":
        setPosts(allPosts);
        return;
      case "missing":
        postType = 0; // 注意这里是数字，不是字符串
        break;
      case "found":
        postType = 1; // 同上
        break;
      case "general":
        postType = 2; // 同上
        break;
      default:
        setPosts(allPosts);
        return;
    }
    const filtered = allPosts.filter(post => post.postType === postType); // 确保这里不要转换成字符串
    setPosts(filtered);
  };

  useEffect(() => {
    filterPosts(selectedMenu);
  }, [selectedMenu, allPosts]);

  const region = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      }
    : {
        // 这里是备用位置，如果无法获取位置或用户拒绝权限，它将默认回到这里
        latitude: -37.8109481,
        longitude: 144.9563753,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView>
          <View className="flex-row items-between justify-between px-8">
            <View>
              <Text className="text-[40px] text-[#0B646B] font-bold">
                {"Map"}
              </Text>
              <Text className="text-[20px] text-[#527283]">{user.nickname}</Text>
            </View>
            <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
              <Image
                className="w-full h-full rounded-md object-cover"
                source={require("./../assets/logo.jpg")}
              />
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
          >
            {userLocation && (
              <Marker coordinate={userLocation}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <RadarAnimation />
                  <EvilIcons name="location" size={40} color="#9747ff" />
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
                onPress={() => handleMarkerPress(post)}// 添加点击事件
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
    height: 500, // 为地图设置一个高度，这样它就能正确显示了
  },
  // 其他可能的样式
  headshown:{
    borderWidth: 2, 
    borderColor: 'red', 
    borderRadius: 25, 
    width: 50, 
    height: 50, 
  },
});

export default MapScreen;
