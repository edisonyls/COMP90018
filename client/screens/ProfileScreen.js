import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Dimensions, 
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
//import MenuContainer from "../components/MenuContainer";
import ItemCardContainer from "../components/ItemCardContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

const ProfileScreen = () => {
    const [type, setType] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState(["hi"]);
  
    const navigation = useNavigation();
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    });
  
    return (
      <SafeAreaView className="flex-1 bg-white relative">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0B646B" />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.container}>
               
                <View style={styles.backgroundImageContainer}>
                    <Image 
                    style={styles.backgroundImage}
                    source={require("../assets/BcakGround.jpg")} // 请确保这里使用正确的图片路径
                    />
                    <Image
                    style={styles.foregroundImage}
                    source={require("../assets/ProfileHead.jpg")} // 请确保这里使用正确的图片路径
                    />
                </View>

                
                <View style={styles.absoluteTextView}>
                    <Text style={styles.absoluteText}>John</Text>
                </View>
            </View>
            <View style={styles.menuSection}>
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
          </ScrollView>
        )}
      </SafeAreaView>
    );
};
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImageContainer: {
      position: 'absolute',
      width: screenWidth,
      height: 198,
      top: 70,
      left: 0,
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: 157,
      top: 0,
      left: 0,
    },
    foregroundImage: {
      position: 'absolute',
      width: 83,
      height: 83,
      top: 115,
      left: (screenWidth / 2) - (83 / 2),  // 水平居中
    },
    absoluteTextView: {
      position: 'absolute',
      width: screenWidth,  // 使文本容器宽度与屏幕宽度相同
      top: 276,  // 根据您的布局，这里可能需要调整
      left: 0,  // 从左边缘开始，确保宽度覆盖整个屏幕
      alignItems: 'center',  // 这会影响容器内的所有元素（即文本）
      justifyContent: 'center',  // 在容器内居中文本（如果有必要）
    },
    absoluteText: {
      // 在此添加您的字体样式
      fontWeight: '700', // 假设 'bold-20' 指的是字体粗细
      fontSize: 20,
      color: 'black',
      // ...其他样式
      textAlign: 'center', // 确保文本在其行内居中
    },
    menuSection: {
      marginTop: 20, // Adjust the space based on your design preferences
    },
  });
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
  
  
export default ProfileScreen;
  