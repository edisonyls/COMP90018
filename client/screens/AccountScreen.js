import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useUserContext } from "../context/userContext";
import {
  uploadHead,
  uploadBackground,
  changeUserInfo,
} from "../api/ProfileAPI";

const AccountScreen = () => {
  const { user, updateUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundUri, setBackgroundUri] = useState(null);
  const [headUri, setHeadUri] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uploadProfilePic, setUploadProfilePic] = useState(false);
  const [uploadBackgroundPic, setUploadBackgroundPic] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      // 这里假设你会从 user 或 profileData 中加载数据
      const storedName = user?.nickname ? user.nickname : "Null";
      const storedPhoneNumber = user?.mobile ? user.mobile : "Null";

      const storedBackgroundUri =
        user?.bgImg !== null
          ? { uri: user.bgImg }
          : require("../assets/BcakGround.jpg");
      const storedHeadUri =
        user?.profile !== "default"
          ? { uri: user.profile }
          : require("../assets/ProfileHead.jpg");

      setName(storedName);
      setPhoneNumber(storedPhoneNumber);
      setBackgroundUri(storedBackgroundUri);
      setHeadUri(storedHeadUri);
      setIsLoading(false);
    };

    loadProfileData();
  }, []);

  const updateUserProfile = async () => {
    try {
      const updatedAttributes = {
        bgImg: backgroundUri.uri,
        mobile: phoneNumber,
        nickname: name,
        profile: headUri.uri,
      };

      const updatedUserInfo = {
        birthday: user.birthday,
        country: user.country,
        description: user.description,
        id: user.id,
        mobile: phoneNumber,
        nickname: name,
        password: user.password,
        postcode: user.postcode,
        sex: user.sex,
        state: user.state,
      };
      updateUser(updatedAttributes);
      const response = await changeUserInfo(updatedUserInfo);
      // 处理响应，更新上下文等
    } catch (e) {
      console.error("更新用户资料失败", e);
    }
  };

  const pickImage = async (isBackground) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const asset = result.assets[0];
      const uri = asset.uri;
      const type = asset.type;
      const name = uri.split("/").pop();
      let formData = new FormData();
      formData.append("file", { uri, name, type });

      if (isBackground) {
        setBackgroundUri({ uri, formData });
        setUploadBackgroundPic(true);
      } else {
        setHeadUri({ uri, formData });
        setUploadProfilePic(true);
      }
    }
  };

  const saveAndGoBack = async () => {
    try {
      if (
        typeof backgroundUri === "object" &&
        backgroundUri.uri &&
        uploadBackgroundPic
      ) {
        console.log("background uploading...");
        await uploadBackground(user.id, backgroundUri.formData);
        setUploadBackgroundPic(false);
      }

      // 上传头像图片（如果有更改）
      if (typeof headUri === "object" && headUri.uri && uploadProfilePic) {
        console.log("head uploading...");
        await uploadHead(user.id, headUri.formData);
        setUploadProfilePic(false);
      }

      await updateUserProfile(); // 使用新昵称和手机号更新用户资料

      navigation.navigate("Home");
    } catch (e) {
      console.error("Failed to save profile information", e);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {console.log(user)}
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
              <Image style={styles.backgroundImage} source={backgroundUri} />
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => pickImage(true)}
              >
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>

              {/* 新的容器开始 */}
              <View style={styles.profileContainer}>
                <Image style={styles.headImage} source={headUri} />
                <TouchableOpacity
                  style={styles.editIcon}
                  onPress={() => pickImage(false)}
                >
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
              <Text style={styles.nameLabel}>Phone Number</Text>
              <TextInput
                style={styles.nameInput}
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                placeholder="Enter your phone number"
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
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backgroundImage: {
    width: "100%", // 宽度为100%，以填满容器
    height: 198, // 这可以根据您的背景图像进行调整
  },
  editIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // 半透明的白色
    padding: 8, // 添加一些内边距，使图标更易于点击
    borderRadius: 20, // 圆形背景
  },

  profileContainer: {
    position: "relative", // 同上
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 10,
  },
  headImage: {
    width: 83,
    height: 83,
    position: "absolute", // 设置为绝对定位
    bottom: 40, // 这意味着图片的底部将位于容器边界以下的位置，实现重叠效果
    borderRadius: 83 / 2,
  },

  saveButton: {
    backgroundColor: "#9747FF", // 按钮背景色
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 40, // 水平边距
    marginBottom: 20, // 底部边距
    position: "absolute", // 添加绝对定位
    bottom: 20, // 按钮距离底部的距离
    left: 0, // 按钮距离左边的距离
    right: 0, // 按钮距离右边的距离
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
    textAlign: "center", // 文本居中
    padding: 10, // 内边距
  },
});

export default AccountScreen;
