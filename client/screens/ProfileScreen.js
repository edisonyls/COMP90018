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
import { getAllPostsPerUser } from "../api/auth";
import { logoutAction } from "../api/ProfileAPI";

const Tab = createBottomTabNavigator();

const ProfileScreen = () => {
  const [type, setType] = useState("post");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Post"); // 默认选中“post”

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
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPostsPerUser(user.id);
        if (data.success) {
          setMainData(data.data);
        } else {
          console.error("Failed to fetch posts: ", data.msg);
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedMenu === "post") {
      fetchPosts();
    }
  }, [selectedMenu, user.id]);

  const handleLogout = async () => {
    // Call logoutAction with the user's id
    const result = await logoutAction(user.id);
    if (result) {
      updateUser(null);
      navigation.navigate("SignIn");
    } else {
      Alert.alert("Error", "Failed to logout");
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
                mainData.map((post) => (
                  <ItemCardContainer
                    key={post.id}
                    imageSrc={{ uri: post.picture }} // 使用网络图片地址
                    badge={postTypeToBadge[post.postType] || "Unknown"} // 使用对象映射来确定badge文本
                    petName={post.petName}
                    petKind={post.petCategory}
                    location={post.location}
                    title={post.title}
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
              <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                <Image
                  source={require("../assets/ProfileAccount.jpg")} // replace with your image's path
                  style={styles.sectionImage}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Notification")}
              >
                <Image
                  source={require("../assets/ProfileNotification.jpg")} // replace with your image's path
                  style={styles.sectionImage}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Security")}>
                <Image
                  source={require("../assets/ProfileSecurity.jpg")} // replace with your image's path
                  style={styles.sectionImage}
                />
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>Help</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ContactUs")}
              >
                <Image
                  source={require("../assets/ProfileContactUs.jpg")} // replace with your image's path
                  style={styles.sectionImage}
                />
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>Log Out</Text>
              <TouchableOpacity onPress={handleLogout}>
                <Image
                  source={require("../assets/ProfileLogout.jpg")} // replace with your image's path
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
});

export default ProfileScreen;
