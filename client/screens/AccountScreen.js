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
  KeyboardAvoidingView,
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
import LoadingView from "../components/LoadingView";

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
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (e) {
      console.error("更新用户资料失败", e);
      setIsLoading(false);
    }
  };

  const pickImage = async (isBackground) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const saveAndGoBack = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
      navigation.goBack();
    } catch (e) {
      console.error("Failed to save profile information", e);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-white relative">
        <>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {isLoading && <LoadingView loading={isLoading} />}
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3", // 添加底部边界线以区分头部
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // 使用深色字体提高可读性
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 20, // 增加底部边距以避免挤压
  },
  backgroundImage: {
    width: "100%",
    height: 200, // 修改高度以适应不同设备
    resizeMode: "cover", // 确保图片完全覆盖容器
  },
  editIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFF", // 明亮的背景色确保图标可见
    borderRadius: 30,
    padding: 10,
    elevation: 4, // 在安卓上添加阴影
    shadowColor: "#000", // iOS阴影
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileContainer: {
    position: "absolute", // 更改为绝对定位
    top: 150, // 调整位置以重叠背景图片
    alignItems: "center",
  },
  headImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#FFF", // 添加边框突出头像
    overflow: "hidden", // 确保图片不会溢出边界
  },
  saveButton: {
    backgroundColor: "#9747FF",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 50,
    marginTop: 20, // 为按钮添加上边距
    shadowColor: "#9747FF", // iOS阴影
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // 在安卓上添加阴影
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  nameContainer: {
    margin: 20,
    marginBottom: 10,
    borderBottomColor: "#DDD", // 添加底部边界线以区分输入框
    paddingBottom: 10, // 增加底部内边距
  },
  nameLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555", // 暗色标签更易读
    marginBottom: 5, // 增加标签与输入框的距离
  },
  nameInput: {
    fontSize: 16,
    width: "100%", // 设置正方形的宽度
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
