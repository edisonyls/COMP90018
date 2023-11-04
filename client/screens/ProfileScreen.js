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
import React, { useLayoutEffect, useState,useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import MenuContainer from "../components/MenuContainer";
import ItemCardContainer from "../components/ItemCardContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import profileData from '../assets/profileData.json';
import { useProfile } from '../navigators/ProfileContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

const ProfileScreen = () => {
    const [type, setType] = useState("post");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState(["hi"]);
    const [selectedMenu, setSelectedMenu] = useState("post"); // 默认选中“post”
    const [backgroundUri, setBackgroundUri] = useState(null);
    const [headUri, setHeadUri] = useState(null);
    //const { backgroundUri, headUri } = useProfile();
    const navigation = useNavigation();
    const [name, setName] = useState(''); // 新的状态变量来存储用户名
    const isFocused = useIsFocused();

    const loadProfileData = async () => {
      setIsLoading(true);
      const storedName = await AsyncStorage.getItem('@name');
      if (storedName) {
        setName(storedName);
      }
      setIsLoading(false);
    };

    const loadImages = async () => {
      const savedBackgroundUri = await AsyncStorage.getItem('@backgroundUri');
      const savedHeadUri = await AsyncStorage.getItem('@headUri');
      if (savedBackgroundUri) {
        setBackgroundUri(savedBackgroundUri);
      }
      if (savedHeadUri) {
        setHeadUri(savedHeadUri);
      }
    };

    useEffect(() => {
      if (isFocused) {
        loadProfileData();
        loadImages();
      }
    }, [isFocused]);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    },[navigation]);
   
  //   useEffect(() => {
  //     const loadImages = async () => {
  //         const savedBackgroundUri = await AsyncStorage.getItem('@backgroundUri');
  //         const savedHeadUri = await AsyncStorage.getItem('@headUri');
  //         if (savedBackgroundUri) {
  //             setBackgroundUri(savedBackgroundUri);
  //         }
  //         if (savedHeadUri) {
  //             setHeadUri(savedHeadUri);
  //         }
  //     };

  //     loadImages();
  // }, []);
    const getImageSource = (image) => {
      if (typeof image === 'string') {
        // 添加时间戳查询参数以绕过缓存
        const uriWithTimestamp = `${image}?timestamp=${new Date().getTime()}`;
        return { uri: uriWithTimestamp };
      } else {
        return image;
      }
    };

    
    return (
      <SafeAreaView className="flex-1 bg-white relative">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0B646B" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.imageContainer}>
            <Image
              key={backgroundUri} 
              style={styles.backgroundImage}
              source={getImageSource(backgroundUri)}
              
            />
          
            
            {/* 新的容器开始 */}
            <View style={styles.profileContainer}>
              <Image
                key={headUri}
                style={styles.headImage}
                source={getImageSource(headUri)}
                
              />
             
             
               <Text style={styles.profileName}>{name}</Text> 
            </View>
            {/* 新的容器结束 */}
          </View>
            <View style={styles.menuSection}>
               <MenuContainer
                  key={"post"}
                  title="Post"
                  //imageSrc={require("../assets/dog.png")}
                  type={type}
                  setType={setType}
                  setSelectedMenu={setSelectedMenu} 
                />
                <MenuContainer
                  key={"settings"}
                  title="Settings"
                  //imageSrc={require("../assets/dog.png")}
                  type={type}
                  setType={setType}
                  setSelectedMenu={setSelectedMenu} 
                />
            </View> 
            {selectedMenu === "post" ? (
              <View className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap">
                {mainData?.length > 0 ? (
                    <>
                      {/* need unique key */}
                      <ItemCardContainer
                        key={"post_id_1"}
                        imageSrc={require("./../assets/dog_example_1.jpg")}
                        badge="Missing"
                        petName="Ross"
                        petKind="British"
                        location="West Melbourne"
                        title="$100 Reward"
                      />
                    </>
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
            ) : selectedMenu === "settings" ? (
              <View>
                <Text style={styles.sectionTitle}>Account</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                
                  <Image 
                    source={require('../assets/ProfileAccount.jpg')} // replace with your image's path
                    style={styles.sectionImage}
                  />
                </TouchableOpacity>
             
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                  <Image 
                    source={require('../assets/ProfileNotification.jpg')} // replace with your image's path
                    style={styles.sectionImage}
                  />
                </TouchableOpacity>

             
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                  <Image 
                    source={require('../assets/ProfileSecurity.jpg')} // replace with your image's path
                    style={styles.sectionImage}
                  />
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>Help</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                  <Image 
                    source={require('../assets/ProfileContactUs.jpg')} // replace with your image's path
                    style={styles.sectionImage}
                  />
                </TouchableOpacity>
              </View>
            ) : null}   
            
           
            

            
          </ScrollView>
        )}
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    profileContainer: {
      position: 'relative', // 同上
      alignItems: 'center',
      paddingTop: 50,
      paddingBottom: 10,
    },
    menuSection: {
      flexDirection: 'row', // 使 menuContainer 内的元素水平排列
      justifyContent: 'space-evenly', // 平均分配子元素之间的空间
      marginTop: 20, // 为顶部增加一些空间
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
    sectionContainer: {
      paddingHorizontal: 16,  // 左右边距
      paddingTop: 16,  // 顶部边距
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: 'black',
      marginTop:20,
      textAlign: 'left',  // 靠左对齐
      marginBottom: 10,  // 和图片之间的距离
      marginLeft:10,
    },
    sectionImage: {
      width: 350,  // 图片宽度为容器宽度
      height: 45,  // 高度根据宽度和比例自动调整
      
      marginBottom: 40,  // 图片之间的距离
      marginLeft:20,
      resizeMode: 'cover',  // 如果图片宽度和高度与容器不符，确保图片完整覆盖
    },
    editIcon: {
      position: 'absolute', // 使用绝对定位
      top: 10, // 距离容器顶部10单位
      right: 10, // 距离容器右侧10单位
    },

  });

  
  
 export default ProfileScreen;
  