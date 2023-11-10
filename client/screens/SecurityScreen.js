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
  KeyboardAvoidingView,
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

  

  const handleSave = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        Alert.alert("Error", "The new password and confirmation do not match.");
        return;
      }
      
      setIsLoading(true); 
      const response = await changeUserPassword(user.id, oldPassword, newPassword);
      if (response.success) {
        
        Alert.alert("Success", "Password changed successfully.");
        navigation.goBack();
      } else {
        
        Alert.alert("Error", response.message || "Password change failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to change password.");
    } finally {
      setIsLoading(false); 
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
    width: "100%", 
    height: 50,
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: "#DDDDDD", 
    marginTop: 5,
    textAlign: "center", 
    padding: 10, 
  },
  saveButton: {
    backgroundColor: "#9747FF", 
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 40, 
    marginBottom: 20, 
    position: "absolute",
    bottom: 20, 
    left: 0,
    right: 0,
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
