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
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [backgroundUri, setBackgroundUri] = useState(require('../assets/BcakGround.jpg'));
    const [headUri, setHeadUri] = useState(require('../assets/ProfileHead.jpg'));
    const getImageSource = (image) => {
        if (typeof image === 'string') {
          return { uri: image }; // 这是一个 URI
        } else {
          return image; // 这是一个本地资源
        }
      };
      const pickImage = async (isBackground) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
  
        if (!result.canceled) {
          const uri = result.assets[0].uri;
          if (isBackground) {
              // 更新背景图片
              setBackgroundUri(uri);
          } else {
              // 更新头像
              setHeadUri(uri);
          }
      }
    }
    // const saveAndGoBack = () => {
    //     // 这里可以添加保存图片 URI 的逻辑
    //     // ...

    //     // 返回上一页
    //     navigation.goBack();
    // };
    const saveAndGoBack = async () => {
        try {
            // 保存背景图片和头像的 URI 到本地存储
            await AsyncStorage.setItem('@backgroundUri', backgroundUri);
            await AsyncStorage.setItem('@headUri', headUri);
    
            // 返回上一页
            navigation.goBack();
        } catch (e) {
            // 保存出错的处理
            console.error("Failed to save URIs", e);
        }
    };

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
                    
                    {/* 新的容器开始 */}
                    <View style={styles.profileContainer}>
                        <Image
                            style={styles.headImage}
                            source={getImageSource(headUri)}
                            //source={getImageFromPath(profileData.profile.headImage)}
                        />
                        <TouchableOpacity 
                        style={styles.editIcon}
                        onPress={() => pickImage(false)}>
                            <AntDesign name="edit" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.profileName}>{profileData.profile.name}</Text> 
                    </View>
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={saveAndGoBack}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
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

  profileContainer: {
    position: 'relative', // 同上
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
  },
  headImage: {
    width: 83,
    height: 83,
    position: 'absolute', // 设置为绝对定位
    bottom: 40, // 这意味着图片的底部将位于容器边界以下的位置，实现重叠效果
    borderRadius: 83 / 2,
  },
    profileName: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
        textAlign: 'center',
        //marginVertical: 10, // 增加垂直方向的空间
      },
 
  saveButton: {
    backgroundColor: '#0B646B', // 按钮背景色
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20, // 水平边距
    marginBottom: 20, // 底部边距
},
saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
},
});

export default AccountScreen;

