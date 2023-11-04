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
import MenuContainer from "../components/MenuContainer";
import ItemCardContainer from "../components/ItemCardContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import profileData from '../assets/profileData.json';
import { useProfile } from '../navigators/ProfileContext';


const NotificationScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    return(
        <SafeAreaView className="flex-1 bg-white relative">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0B646B" />
          </View>
        ) : (   
            
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                 <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="leftcircleo" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Account</Text>
                    <View /> 
                </View>
                <View style={styles.imageContainer}>
                    <Image
                    style={styles.backgroundImage}
                    source={getImageSource(backgroundUri)}
                    //source={getImageFromPath(profileData.profile.backgroundImage)}
                    />
                    <TouchableOpacity 
                    style={styles.editIcon} 
                    onPress={() => pickImage(true)}>
                    <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        )}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    
  },
  backgroundImage: {
    width: '100%', // 宽度为100%，以填满容器
    height: 198, // 这可以根据您的背景图像进行调整
  },
  editIcon: {
    position: 'absolute', // 使用绝对定位
    top: 10, // 距离容器顶部10单位
    right: 10, // 距离容器右侧10单位
  },
});

export default NotificationScreen;

