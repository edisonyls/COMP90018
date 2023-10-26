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
import React, { useLayoutEffect, useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MenuContainer from "../components/MenuContainer";
import MapView, { Marker }from 'react-native-maps';
import markersData from '../assets/MarkersData'; 
import * as Location from 'expo-location';
import { Animated, Easing } from 'react-native';
const RadarAnimation = React.memo(() => {
const scaleValue = new Animated.Value(0); // 初始值为0

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
        borderColor: 'blue', // 雷达的颜色
        width: 200,
        height: 200,
        position: 'absolute',
        transform: [{ scale }],
      }}
    />
  );
});
  const MapScreen = () => {
    const [type, setType] = useState("all");
    const [isLoading, setIsLoading] = useState(false); 
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigation();
    const userLocation = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    : null; 


    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    },[navigation]);
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
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
                        <Text className="text-[20px] text-[#527283]">userName</Text>
                    </View>
                    <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
                        <Image
                            className="w-full h-full rounded-md object-cover"
                            source={require("./../assets/logo.jpg")}
                        />
                    </View>
                </View>

                <View className="flex-row item-center justify-center px-8 mt-4">
                    <MenuContainer
                    key={"all"}
                    title="All"
                    imageSrc={require("../assets/dog.png")}
                    type={type}
                    setType={setType}
                    />
                    <MenuContainer
                    key={"missing"}
                    title="Missing"
                    imageSrc={require("../assets/dog.png")}
                    type={type}
                    setType={setType}
                    />
                    <MenuContainer
                    key={"found"}
                    title="Found"
                    imageSrc={require("../assets/dog.png")}
                    type={type}
                    setType={setType}
                    />
                </View>   
                <MapView
                  style={styles.map}
                  provider={MapView.PROVIDER_GOOGLE}
                  region={region}
                
                >
                  {userLocation && (
                    <Marker coordinate={userLocation}>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <RadarAnimation />
                      </View>
                    </Marker>
                  )}
                  {markersData.map((marker) => (
                  <Marker
                
                    key={marker.id}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude
                    }}
                  >
                    <Image
                      source={marker.image} // 更改为你的图像路径
                      style={{ width: 50, height: 50 }} // 你可以根据需要设置大小
                    />
                    
        
                  </Marker>
                  ))}
                </MapView>
           
           </ScrollView>
        )}
      </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  
    map: {
        height: 500,  // 为地图设置一个高度，这样它就能正确显示了
    },
    // 其他可能的样式
});

  
export default MapScreen;
