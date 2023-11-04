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
    TextInput, 
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MenuContainer from "../components/MenuContainer";
import ItemCardContainer from "../components/ItemCardContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import profileData from '../assets/profileData.json';
import { useProfile } from '../navigators/ProfileContext';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AccountScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundUri, setBackgroundUri] = useState(null);
  const [headUri, setHeadUri] = useState(null);
  const [name, setName] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const loadProfileData = async () => {
        setIsLoading(true);
        const storedName = await AsyncStorage.getItem('@name');
        const storedBackgroundUri = await AsyncStorage.getItem('@backgroundUri');
        const storedHeadUri = await AsyncStorage.getItem('@headUri');
        
        if (storedName) {
            setName(storedName);
        } else {
            setName(profileData.profile.name); // 从 JSON 文件获取默认值
        }
        
        if (storedBackgroundUri) {
            setBackgroundUri(storedBackgroundUri);
        } else {
            setBackgroundUri(require('../assets/BcakGround.jpg')); // 设置默认背景图片
        }
        
        if (storedHeadUri) {
            setHeadUri(storedHeadUri);
        } else {
            setHeadUri(require('../assets/ProfileHead.jpg')); // 设置默认头像
        }
        
        setIsLoading(false); // 加载完成
    };

    loadProfileData();
}, []);

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

    const saveAndGoBack = async () => {
        try {
          const backgroundUriString = typeof backgroundUri === 'string' ? backgroundUri : JSON.stringify(backgroundUri);
        const headUriString = typeof headUri === 'string' ? headUri : JSON.stringify(headUri);

            // 保存背景图片和头像的 URI 到本地存储
            await AsyncStorage.setItem('@backgroundUri', backgroundUri);
            await AsyncStorage.setItem('@headUri', headUri);
            await AsyncStorage.setItem('@name', name);
            // await AsyncStorage.setItem('@name', name);
            profileData.profile.name = name;

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
          <>
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
                        
                    </View>
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameLabel}>Username</Text>
                  <TextInput
                    style={styles.nameInput}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder="Enter your name"
                  />
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameLabel}>Email</Text>
                  <TextInput
                    style={styles.nameInput}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder="Enter your email"
                  />
                </View>
            </ScrollView>
              <TouchableOpacity style={styles.saveButton} onPress={saveAndGoBack}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          </>

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
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // 半透明的白色
    padding: 8, // 添加一些内边距，使图标更易于点击
    borderRadius: 20, // 圆形背景
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
 
 
  saveButton: {
    backgroundColor: '#9747FF', // 按钮背景色
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 40, // 水平边距
    marginBottom: 20, // 底部边距
    position: 'absolute', // 添加绝对定位
    bottom: 20, // 按钮距离底部的距离
    left: 0, // 按钮距离左边的距离
    right: 0, // 按钮距离右边的距离
  },
saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
},
nameContainer: {
  margin: 20,
  marginBottom: 10,
},
nameLabel: {
  fontSize: 18,
  fontWeight: "bold",
},
nameInput: {
  fontSize: 16,
  width: 300, // 设置正方形的宽度
  height: 50, // 设置正方形的高度
  borderRadius: 15, // 设置圆角的大小
  borderWidth: 1, // 设置边框宽度 
  borderColor: "#DDDDDD", // 设置边框颜色
  marginTop: 5,
  textAlign: 'center', // 文本居中
  padding: 10, // 内边距
},
});

export default AccountScreen;

