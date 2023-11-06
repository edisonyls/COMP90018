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
import { useProfile } from '../navigators/ProfileContext';
import { useUserContext } from "../context/userContext";
import { changeUserInfo } from "../api/auth";

const SecurityScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigation = useNavigation();
    const { user,setUser } = useUserContext();

    const handleSave = async () => {
        if (oldPassword !== user.password) {
            Alert.alert("Error", "The old password is incorrect.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            Alert.alert("Error", "The new password and confirmation do not match.");
            return;
        }

        try {
            setIsLoading(true);
            const updatedUserInfo = {
                // ... 其他用户信息 ...
                id: user.id,
                password: newPassword, // 更新的密码
                // ... 其他用户信息 ...
            };

            const response = await changeUserInfo(updatedUserInfo);
            // 处理响应，更新上下文等
            setUser({ ...user, password: newPassword }); // 更新上下文中的密码
            navigation.goBack();
        } catch (e) {
            Alert.alert("Error", "Failed to update the password.");
            console.error("Failed to update password", e);
        } finally {
            setIsLoading(false);
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
                    <Text style={styles.headerTitle}>Notification</Text>
                    <View /> 
                </View>
                <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            placeholder="Enter old password"
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="Enter new password"
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputContainer}>
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
});

export default SecurityScreen;