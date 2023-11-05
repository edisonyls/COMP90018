import React from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import {
  StyledContainer,
  InnerContainer,
  Colors,
  PageTitle,
  StyledImage,
  StyledButton,
  ButtonText,
  SubTitle,
} from "../styles/LandingStyle";
import { FlatList, View, Text, Image } from "react-native";
const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

const Landing = ({ navigation }) => {
  const images = [
    require("../assets/Landing1.jpg"),
    require("../assets/Landing2.jpg"),
    require("../assets/Landing3.jpg"),
  ];
  return (
    <StyledContainer>
      <InnerContainer>
        <PageTitle>Meet your animal needs here</PageTitle>

        <FlatList
          data={images}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image style={{ width: 380, height: 550 }} source={item} /> // 您可以根据需要调整图片的尺寸
          )}
        />

        <SubTitle>
          Get interesting promos here, register your account immediately so you
          can meet your animal needs.
        </SubTitle>

        <StyledButton onPress={() => navigation.navigate("Post")}>
          <ButtonText> Get Start</ButtonText>
        </StyledButton>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Landing;
