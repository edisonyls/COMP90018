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
import { AntDesign } from "@expo/vector-icons";
import React, { useLayoutEffect, useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MenuContainer from "../components/MenuContainer";
import ItemCardContainer from "../components/ItemCardContainer";
import MapView from 'react-native-maps';

  
  const MapScreen = () => {
    const [type, setType] = useState("all");
    const [isLoading, setIsLoading] = useState(false); // 初始时加载状态为 true
    // const [location, setLocation] = useState(null); // 存储用户位置
    // const [errorMsg, setErrorMsg] = useState(null); // 如果有错误，存储错误信息

  
    const navigation = useNavigation();
    // useEffect(() => {
    //   (async () => {
    //       let { status } = await Location.requestForegroundPermissionsAsync();
    //       if (status !== 'granted') {
    //           setErrorMsg('Permission to access location was denied');
    //           return;
    //       }

    //       let location = await Location.getCurrentPositionAsync({});
    //       setLocation(location);
    //       setIsLoading(false); // 更新加载状态
    //   })();
    // }, []);
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    },[navigation]);
    const region = {
      latitude: -37.8109481,
      longitude: 144.9563753,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    // 如果位置未加载，则显示加载指示器
  //   if (isLoading) {
  //     return (
  //         <View style={styles.container}>
  //             <ActivityIndicator size="large" color="#0000ff" />
  //         </View>
  //     );
  // }

  // // 如果有错误信息，则显示错误
  // if (errorMsg) {
  //     return (
  //         <View style={styles.container}>
  //             <Text>{errorMsg}</Text>
  //         </View>
  //     );
  // }

  // // 默认坐标（用户位置可用时将更新这些坐标）
  // let region = {
  //     latitude: 37.78825,
  //     longitude: -122.4324,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  // };

  // // 如果我们有用户位置信息，则更新坐标
  // if (location) {
  //     region = {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //     };
  // }

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
                // 不需要显示用户位置，因为我们使用的是固定位置
                />
           
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
