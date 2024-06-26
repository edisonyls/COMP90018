import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, Alert, Text } from "react-native";
import { isValidEmail, isPasswordValid } from "../utils/utils";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledTextInput,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
  LogoAndTextContainer,
  WelcomeText,
} from "../components/styles";
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import { loginRequest } from "../api/auth";
import LoadingView from "../components/LoadingView";
import { useUserContext } from "../context/userContext";

const { primary, darkLight, brand } = Colors;

const SignIn = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const { setUser } = useUserContext();

  const handleFormSubmission = async (values) => {
    if (values.email === "" || values.password === "") {
      Alert.alert("Oops!", "Please fill in your credentials!");
    } else if (!isValidEmail(values.email)) {
      Alert.alert(
        "Invalid Email",
        "The email address you entered is not valid."
      );
      return;
    } else {
      setLoading(true);
      const res = await loginRequest(values.email, values.password);
      if (res === false) {
        setLoading(false);
        console.log("Server side is down. Check api connection.");
        Alert.alert("Login Failed!", res.msg);
        setLoading(false);
      } else if (!res.success) {
        Alert.alert("Login Failed!", res.msg);
        setLoading(false);
      } else {
        setUser(res.data);
        setLoading(false);

        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }], // 确保这里的 'Home' 是你的 Tab 导航器的路由名称
        });
      }
      setLoading(false);
    }
  };

  const handleGoogleSubmit = () => {
    Alert.alert("Oops!", "This function is for future implementation only!");
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <LogoAndTextContainer>
          <View>
            <WelcomeText>Hello,</WelcomeText>
            <WelcomeText>Welcome Back!</WelcomeText>
          </View>
          <PageLogo
            resizeMode="cover"
            source={require("./../assets/logo.jpg")}
          />
        </LogoAndTextContainer>
        <SubTitle>
          Our community stays strong and friendly as we have you!
        </SubTitle>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleFormSubmission}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Email Address"
                icon="mail"
                placeholder="test@hotmail.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              <MyTextInput
                label="Password"
                icon="lock"
                placeholder="* * * * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MsgBox>...</MsgBox>
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Sign In</ButtonText>
              </StyledButton>
              <Line />
              <StyledButton google={true} onPress={handleGoogleSubmit}>
                <Fontisto name="google" color={primary} size={25} />
                <Text className="text-[#ffffff] text=[16px] ml-2">
                  Signin with Google
                </Text>
              </StyledButton>
              <ExtraView>
                <ExtraText>Don't have an account already? </ExtraText>
                <TextLink onPress={() => navigation.navigate("Register")}>
                  <TextLinkContent>Register</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
      {loading && <LoadingView loading={loading} />}
    </StyledContainer>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default SignIn;
