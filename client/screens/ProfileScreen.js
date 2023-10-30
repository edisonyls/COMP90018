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

const Tab = createBottomTabNavigator();

const ProfileScreen = () => {
    const [type, setType] = useState("post");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState(["hi"]);
    const [selectedMenu, setSelectedMenu] = useState("post"); // 默认选中“post”
  
    const navigation = useNavigation();
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    },[navigation]);
  
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
              style={styles.backgroundImage}
              source={require("../assets/BcakGround.jpg")}
            />
            {/* 新的容器开始 */}
            <View style={styles.profileContainer}>
              <Image
                style={styles.headImage}
                source={require("../assets/ProfileHead.jpg")}
              />
              <Text style={styles.profileName}>John</Text>
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
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                
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
      alignItems: 'center',
      paddingTop: 50,  // 头像图片下方的空间，可以根据需要调整
      paddingBottom: 10,  // “John”文字下方的空间，可以根据需要调整
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
      // marginTop, position 和其他相关样式将被移除，因为我们不再使用绝对定位
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
      marginLeft:40,
    },
    sectionImage: {
      width: 350,  // 图片宽度为容器宽度
      height: 45,  // 高度根据宽度和比例自动调整
      
      marginBottom: 40,  // 图片之间的距离
      marginLeft:38,
      resizeMode: 'cover',  // 如果图片宽度和高度与容器不符，确保图片完整覆盖
    },

  });
//   const MenuContainer = ({ title, imageSrc, type, setType, setSelectedMenu }) => {
//     const handlePress = () => {
//       setType(title.toLowerCase());
//       setSelectedMenu(title.toLowerCase()); // 设置当前选中的菜单
//     };
  
//     return (
//       <TouchableOpacity
//         className="items-center justify-center space-y-2"
//         onPress={handlePress}
//       >
//         <View
//           className={`w-20 h-20 p-2 shadow-sm rounded-full items-center justify-center m-1 ${
//             type === title.toLowerCase() ? "bg-gray-300" : "bg-white"

//           }`}
//         >
//           <Image className="w-full h-full object-contain" source={imageSrc} />
//           <Text className="text-[#00BCC9] text-[16px] font-semibold">
//             {title}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
  
  
 export default ProfileScreen;
  