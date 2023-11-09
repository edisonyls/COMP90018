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
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../context/userContext";
import { changeUserPassword } from "../api/ProfileAPI";

const SecurityScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigation = useNavigation();
  const { user } = useUserContext();

  // const updateUserProfile = async () => {
  //   try {
  //     const updatedUserInfo = {
  //       // ... 其他用户信息 ...
  //       id: user.id,
  //       mobile: user.mobile, // 更新的手机号码
  //       nickname: user.nickname, // 更新的昵称
  //       email1: user.email1, // 更新的邮箱
  //       password: newPassword,
  //       // ... 其他用户信息 ...
  //     };

  //     const response = await changeUserInfo(updatedUserInfo);
  //     // 处理响应，更新上下文等
  //   } catch (e) {
  //     console.error("更新用户资料失败", e);
  //   }
  // };

  const handleSave = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        Alert.alert("Error", "The new password and confirmation do not match.");
        return;
      }
      
      setIsLoading(true); // 开始加载状态
      const response = await changeUserPassword(user.id, oldPassword, newPassword);
      if (response.success) {
        // 假设响应中有一个 success 字段表明操作是否成功
        Alert.alert("Success", "Password changed successfully.");
        navigation.goBack();
      } else {
        // 如果响应中的 success 字段为 false 或不存在这个字段，显示错误信息
        Alert.alert("Error", response.message || "Password change failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to change password.");
    } finally {
      setIsLoading(false); // 结束加载状态
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
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
            <Text style={styles.headerTitle}>Security</Text>
            <View />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.nameLabel}>Old Password</Text>
            <TextInput
              style={styles.input}
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholder="Enter old password"
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.nameLabel}>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.nameLabel}>Confirm New Password</Text>
            <TextInput
              style={styles.input}
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              placeholder="Confirm new password"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
    </KeyboardAvoidingView>
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
  inputContainer: {
    margin: 20,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    width: "100%", // 宽度为100%
    height: 50, // 高度
    borderRadius: 15, // 圆角
    borderWidth: 1, // 边框宽度
    borderColor: "#DDDDDD", // 边框颜色
    marginTop: 5,
    textAlign: "center", // 文本居中
    padding: 10, // 内边距
  },
  saveButton: {
    backgroundColor: "#9747FF", // 按钮背景色
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 40, // 水平边距
    marginBottom: 20, // 底部边距
    //position: "absolute", // 添加绝对定位
    bottom: 20, // 按钮距离底部的距离
    left: 0, // 按钮距离左边的距离
    right: 0, // 按钮距离右边的距离
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  nameLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SecurityScreen;
