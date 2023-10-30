import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MenuContainer from "../components/MenuContainer";
import ItemCardContainer from "../components/ItemCardContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [type, setType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState(["hi"]);
  const [selectedMenu, setSelectedMenu] = useState("all"); 

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView>
          <View className="flex-row items-between justify-between px-8">
            <View>
              <Text className="text-[40px] text-[#0B646B] font-bold">
                {"Welcome :)"}
              </Text>
              <Text className="text-[20px] text-[#527283]">Test User</Text>
            </View>
            <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
              <Image
                className="w-full h-full rounded-md object-cover"
                source={require("./../assets/logo.jpg")}
              />
            </View>
          </View>

          <View className="px-4 mt-4">
            <Text className="text-[#2C7379] text-[20px] font-bold">
              Category
            </Text>
          </View>
          <ScrollView 
            horizontal={true} // 开启横向滚动
            showsHorizontalScrollIndicator={false} // 当你不想显示滚动条时
            // 你也可以添加一些额外的样式和属性，例如分页等
          >
             <View className="flex-row item-center justify-center px-8 mt-4">
            <MenuContainer
              key={"all"}
              title="All"
              imageSrc={require("../assets/dog.png")}
              type={type}
              setType={setType}
              //setSelectedMenu={setSelectedMenu} 
            />
            <MenuContainer
              key={"missing"}
              title="Missing"
              imageSrc={require("../assets/dog.png")}
              type={type}
              setType={setType}
              //setSelectedMenu={setSelectedMenu} 
            />
            <MenuContainer
              key={"found"}
              title="Found"
              imageSrc={require("../assets/dog.png")}
              type={type}
              setType={setType}
              //setSelectedMenu={setSelectedMenu} 
            />
            <MenuContainer
              key={"general"}
              title="General"
              imageSrc={require("../assets/dog.png")}
              type={type}
              setType={setType}
              //setSelectedMenu={setSelectedMenu} 
            />
          </View> 

            
          </ScrollView>
          
          <View>
            <View className="flex-row items-center justify-between px-4 mt-4">
              <Text className="text-[#2C7379] text-[20px] font-bold">
                All Post
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#A0C4C7] text-[14px] font-bold">
                  Filter By
                </Text>
                <AntDesign name="doubleright" size={12} color="#A0C4C7" />
              </TouchableOpacity>
            </View>
            {selectedMenu === "all" ? (
                <View>
                </View>

            ):null}
            <View className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {/* need unique key */}
                  <ItemCardContainer
                    key={"post_id_1"}
                    imageSrc={require("./../assets/dog_example_1.jpg")}
                    badge="Missing"
                    petName="Ross"
                    petKind="British"
                    location="West Melbourne"
                    title="$100 Reward"
                  />
                  <ItemCardContainer
                    key={"post_id_2"}
                    imageSrc={require("./../assets/logo.jpg")}
                    badge="Found"
                    petName="Miso"
                    petKind="Sausage"
                    title="Seen at Carlton"
                    location="Carlton"
                  />
                  <ItemCardContainer
                    key={"post_id_3"}
                    imageSrc={require("./../assets/logo.jpg")}
                    badge="General"
                    petName="Miso"
                    petKind="Sausage"
                    title="This is a really long title, I want to see how it looks like when it is too long to fit in the card"
                    location="Carlton"
                  />
                </>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Image
                      source={require("../assets/logo.jpg")}
                      className="w-32 h-32 object-cover"
                    />
                    <Text className="text-2xl text-[#428288] font-semibold">
                      oops... No Data Found
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
