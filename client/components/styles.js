import styled from "styled-components";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;
// colors
export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${primary};
`;



export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const LogoAndTextContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
  flex-direction: row;
`;

export const WelcomeText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-left: 15px;
`;

export const PageLogo = styled.Image`
  width: 100px;
  height: 100px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
`;

export const SubTitle = styled.Text`
  font-size: 12px;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 10px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${darkLight};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 20px;
  font-size: 16px;
  height: 60px;
  margin-bottom: 10px;
  /* margin-vertical: 3px seems not to work */
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  height: 60px;
  margin-bottom: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  ${(props) =>
    props.google == true &&
    `
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
  `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
  ${(props) =>
    props.google == true &&
    `
    padding: 25px;
    margin-bottom: 15px;
  `}
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-bottom: 10px;
  /* margin-vertical: 10px; */
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;

export const CheckBoxView = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const StyledCheckBox = styled(Checkbox)`
  color: ${brand};
  margin-right: 10px;
  margin-left: 10px;
`;
