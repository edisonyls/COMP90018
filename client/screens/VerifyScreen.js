import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { verifyEmail } from "../api/auth";
import { useUserContext } from "../context/userContext";
import LoadingView from "../components/LoadingView";

let newInputIndex = 0;

const VerifyScreen = ({ navigation, route }) => {
  const [OTP, setOTP] = useState({ 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" });
  const [nextInputIndex, setNextInputIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const { setUser } = useUserContext();

  const inputs = Array(6).fill("");
  const input = useRef();
  const { email, password, username } = route.params;
  const { width } = Dimensions.get("window");
  const inputWidth = Math.round(width / 8);

  const handleChangeText = (text, index) => {
    const newOTP = { ...OTP };
    newOTP[index] = text;
    setOTP(newOTP);
    const lastInputIndex = inputs.length - 1;
    if (!text) newInputIndex = index === 0 ? 0 : index - 1;
    else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    setNextInputIndex(newInputIndex);
  };

  useEffect(() => {
    input.current.focus();
  }, [nextInputIndex]);

  const submitOTP = async () => {
    const convertToObject = (otpObj) => {
      return Object.keys(otpObj)
        .sort()
        .map((key) => otpObj[key])
        .join("");
    };

    const code = convertToObject(OTP);
    if (code.length !== 6) {
      Alert.alert("Invalid Verification", "Please Enter 6 Digits");
    } else {
      setLoading(true);
      const res = await verifyEmail(code, email, password, username);
      console.log(res);
      if (!res.success) {
        setLoading(false);
        console.log("Register is failed");
      }
      console.log(res.data);
      setUser(res.data);
      setLoading(false);
      navigation.navigate("Home");
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1 justify-center">
      <Text className="text-[#6D28D9] text-center mb-3">
        Please Verify your email
      </Text>
      <Text className="text-[#6D28D9] text-center mb-1">
        PIN has been sent yo your email
      </Text>
      <View
        className="flex-row justify-between"
        style={{
          paddingHorizontal: inputWidth / 2,
          paddingVertical: inputWidth / 2,
        }}
      >
        {inputs.map((inp, index) => {
          return (
            <View
              key={index.toString()}
              className="border-[#6D28D9] border-2 justify-center items-center"
              style={{
                width: inputWidth,
                height: inputWidth,
              }}
            >
              <TextInput
                value={OTP[index]}
                onChangeText={(text) => handleChangeText(text, index)}
                placeholder="0"
                className="text-[15px]"
                keyboardType="numeric"
                maxLength={1}
                ref={nextInputIndex === index ? input : null}
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}
              />
            </View>
          );
        })}
      </View>
      <TouchableOpacity className="mt-10 items-center" onPress={submitOTP}>
        <Feather name="check-circle" size={36} color="#6D28D9" />
      </TouchableOpacity>
      {loading && <LoadingView loading={loading} />}
    </KeyboardAvoidingView>
  );
};

export default VerifyScreen;
