import styled from "styled-components";
//import styled from 'styled-components/native'; // 注意是 'styled-components/native'
import { View, Image, Text, TouchableOpacity } from "react-native";
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

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

export const PageTitle = styled.Text`
  font-size: 35px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
`;

export const SubTitle = styled.Text`
  font-size: 13px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${darkLight};
`;

export const StyledImage = styled.Image`
  width: 250px;
  height: 300px;
`;


export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 60px;
  margin-bottom: 10px;
  /* margin-vertical: 5px; */

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
  `}
`;
export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-bottom: 10px;
  /* margin-vertical: 10px; */
`;
