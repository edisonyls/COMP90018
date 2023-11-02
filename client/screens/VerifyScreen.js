import React, { useState } from "react";
import axios from "axios";
import { View, Text, TextInput, Button, Alert } from "react-native";

const VerifyScreen = ({ navigation, route }) => {
  const [code, setCode] = useState("");

  const { email, password, username } = route.params;

  const handleVerification = () => {
    axios
      .post("http://localhost:8080/verify/signup", {
        code: code,
        email: email,
        password: password,
        username: username,
      })
      .then((response) => {
        if (response.data.success) {
          // Handle successful signup e.g., navigate to a welcome screen or home screen
          navigation.navigate("Home");
        } else {
          Alert.alert(
            "Signup Failed",
            "There was an error during signup. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("There was an error during signup.", error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Enter the 4-digit code sent to your email:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: 200,
          textAlign: "center",
          marginTop: 20,
        }}
        keyboardType="numeric"
        maxLength={6}
        onChangeText={(text) => setCode(text)}
        value={code}
      />
      <Button title="Verify" onPress={handleVerification} />
    </View>
  );
};

export default VerifyScreen;
