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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import MenuContainer from "../components/MenuContainer";
import ItemCardContainer from "../components/ItemCardContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useUserContext } from "../context/userContext";
import { logoutAction, getAllPostsPerUser } from "../api/ProfileAPI";
import LoadingView from "../components/LoadingView";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const ProfileScreen = () => {
  const [type, setType] = useState("post");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Post");

  const navigation = useNavigation();
  //const isFocused = useIsFocused();
  const { user, updateUser } = useUserContext();
  const backgroundImgSource =
    user && user.bgImg !== null
      ? { uri: user.bgImg }
      : require("../assets/BcakGround.jpg");
  const profileHeadImgSource =
    user && user.profile !== "default"
      ? { uri: user.profile }
      : require("../assets/ProfileHead.jpg");

  const postTypeToBadge = {
    0: "Missing",
    1: "Found",
    2: "General",
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    setIsLoading(true);
    getAllPostsPerUser(user.id)
      .then((res) => {
        setMainData(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    const result = await logoutAction(user.id);
    console.log(result.data);
    if (result) {
      updateUser(null);
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "SignIn" }], // 确保这里的 'SignIn' 是你的登录屏幕的路由名称
      });
    } else {
      setIsLoading(false);
      Alert.alert("Success!", "You have been logged out");
      navigation.reset({
        index: 0,
        routes: [{ name: "SignIn" }], // 确保这里的 'SignIn' 是你的登录屏幕的路由名称
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {isLoading ? (
        <LoadingView loading={isLoading} />
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.imageContainer}>
            <Image
              // key={backgroundUri}
              style={styles.backgroundImage}
              source={backgroundImgSource}
            />

            {/* 新的容器开始 */}
            <View style={styles.profileContainer}>
              <Image
                // key={headUri}
                style={styles.headImage}
                source={profileHeadImgSource}
              />

              <Text style={styles.profileName}>{user.nickname}</Text>
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
          {selectedMenu === "Post" ? (
            <View className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                mainData.map((item) => (
                  <ItemCardContainer
                    post={item}
                    navigation={navigation}
                    key={item.id}
                  />
                ))
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Image
                      source={require("../assets/logo.jpg")}
                      className="w-32 h-32 object-cover"
                    />
                    <Text className="text-2xl text-[#428288] font-semibold">
                      You haven't posted anything
                    </Text>
                  </View>
                </>
              )}
            </View>
          ) : selectedMenu === "Settings" ? (
            <View>
              <Text style={styles.sectionTitle}>Account</Text>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Account")}
              >
                <View style={styles.iconContainer}>
                  <SimpleLineIcons name="user" size={24} color="black" />
                </View>
                <Text style={styles.menuText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Security")}
              >
                <View style={styles.iconContainer}>
                  <AntDesign name="lock1" size={24} color="black" />
                </View>
                <Text style={styles.menuText}>Security</Text>
              </TouchableOpacity>

              {/* </TouchableOpacity> */}
              <Text style={styles.sectionTitle}>Help</Text>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("ContactUs")}
              >
                <View style={styles.iconContainer}>
                  <AntDesign name="phone" size={24} color="black" />
                </View>
                <Text style={styles.menuText}>Contact Us</Text>
              </TouchableOpacity>

              <Text style={styles.sectionTitle}>Log Out</Text>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <View style={styles.iconContainer}>
                  <Feather name="log-out" size={24} color="black" />
                </View>

                <Text style={styles.menuText}>Log out</Text>
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
    position: "relative", // 同上
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 10,
  },
  menuSection: {
    flexDirection: "row", // 使 menuContainer 内的元素水平排列
    justifyContent: "space-evenly", // 平均分配子元素之间的空间
    marginTop: 20, // 为顶部增加一些空间
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backgroundImage: {
    width: "100%", // 宽度为100%，以填满容器
    height: 198, // 这可以根据您的背景图像进行调整
  },
  headImage: {
    width: 83,
    height: 83,
    position: "absolute", // 设置为绝对定位
    bottom: 40, // 这意味着图片的底部将位于容器边界以下的位置，实现重叠效果
    borderRadius: 83 / 2,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
    //marginVertical: 10, // 增加垂直方向的空间
  },
  sectionContainer: {
    paddingHorizontal: 16, // 左右边距
    paddingTop: 16, // 顶部边距
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginTop: 10,
    textAlign: "left", // 靠左对齐
    marginBottom: 20, // 和图片之间的距离
    marginLeft: 10,
  },
  sectionImage: {
    width: 350, // 图片宽度为容器宽度
    height: 45, // 高度根据宽度和比例自动调整

    marginBottom: 40, // 图片之间的距离
    marginLeft: 20,
    resizeMode: "cover", // 如果图片宽度和高度与容器不符，确保图片完整覆盖
  },
  editIcon: {
    position: "absolute", // 使用绝对定位
    top: 10, // 距离容器顶部10单位
    right: 10, // 距离容器右侧10单位
  },
  menuItem: {
    flexDirection: "row", // Arrange icon and text in a row
    alignItems: "center", // Center align items
    paddingVertical: 10, // Add padding above and below
    paddingHorizontal: 16, // Add padding on the sides
    marginLeft: 20,
  },
  iconContainer: {
    width: 40, // Width of the circle
    height: 40, // Height of the circle
    borderRadius: 20, // Make it round
    backgroundColor: "#e0e0e0", // Grey background
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
    marginRight: 8, // Add space between the icon and the text
  },
  menuText: {
    fontSize: 16, // Increase font size
    color: "#333", // Dark grey color for the text
    marginLeft: 8, // Add space between the icon and the text
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 16,
  },
});

export default ProfileScreen;
