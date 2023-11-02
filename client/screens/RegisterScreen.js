import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import axios from "axios";
import { Text, View, Alert, ActivityIndicator, Modal } from "react-native";
import Checkbox from "expo-checkbox";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
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
  CheckBoxView,
  StyledCheckBox,
  ModalViewWrap,
  ModalInnerView,
} from "../components/styles";
import { Octicons, Ionicons } from "@expo/vector-icons";

const { darkLight, brand } = Colors;

const Register = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const AlertPopUp = () => {
    Alert.alert("Password not matched", "Please re-enter your password", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  const handleFormSubmission = (values) => {
    setIsLoading(true);
    axios
      .post(
        "http://localhost:8080/verify/sendMail",
        {},
        {
          params: {
            email: values.email,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          navigation.navigate("Verify", {
            email: values.email,
            password: values.password,
            username: values.userName,
          });
        } else {
          console.log("Register failing...");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("There is an error while registering");
        setIsLoading(false);
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <LogoAndTextContainer>
            <View>
              <WelcomeText>Create</WelcomeText>
              <WelcomeText>New Account</WelcomeText>
            </View>
            <PageLogo
              resizeMode="cover"
              source={require("./../assets/logo.jpg")}
            />
          </LogoAndTextContainer>
          <SubTitle>Join our pet family today to help each other out!</SubTitle>

          <Formik
            initialValues={{
              userName: "",
              email: "",
              dateOfBirth: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={handleFormSubmission}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="User Name"
                  icon="person"
                  placeholder="User1"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  value={values.userName}
                />
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
                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox>...</MsgBox>
                <CheckBoxView>
                  <StyledCheckBox
                    value={isChecked}
                    onValueChange={setIsChecked}
                  />
                  <Text>I agree to the terms and conditions</Text>
                </CheckBoxView>
                <MsgBox>{message}</MsgBox>
                <StyledButton
                  onPress={() => {
                    if (values.password !== values.confirmPassword) {
                      AlertPopUp();
                    } else {
                      handleSubmit();
                    }
                  }}
                >
                  <ButtonText>Sign Up</ButtonText>
                </StyledButton>
                <Line />
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("SignIn")}>
                    <TextLinkContent>Login</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
        {isLoading && (
          <Modal
            transparent={true}
            animationType="none"
            visible={isLoading}
            onRequestClose={() => {
              console.log("close modal");
            }}
          >
            <ModalViewWrap>
              <ModalInnerView>
                <ActivityIndicator size="large" color={brand} />
              </ModalInnerView>
            </ModalViewWrap>
          </Modal>
        )}
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
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

export default Register;
