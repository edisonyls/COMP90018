import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigation } from "@react-navigation/native";
import MenuContainer from "../components/MenuContainer";
import ItemCardContainer from "../components/ItemCardContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useUserContext } from "../context/userContext";
import { fetchAllPosts } from "../api/HomeAPI";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [type, setType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("All");
  const [postData, setPostData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useUserContext();

  const userProfile =
    user && user.profile !== "default"
      ? { uri: user.profile }
      : require("../assets/ProfileHead.jpg");

  useEffect(() => {
    setIsLoading(true);
    fetchAllPosts()
      .then((res) => {
        setPostData(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    fetchAllPosts()
      .then((res) => {
        setPostData(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  const filteredData = postData
    ? postData.filter((item) => {
        switch (type) {
          case "all":
            return true;
          case "missing":
            return item.postType === 0;
          case "found":
            return item.postType === 1;
          case "general":
            return item.postType === 2;
          default:
            return true;
        }
      })
    : [];

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
        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
          refreshControl={
            // Add this prop to ScrollView
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} // Bind your onRefresh function
              colors={["#0B646B"]} // Optional: customize the spinner colors
            />
          }
        >
          <View className="flex-row items-between justify-between px-8">
            <View>
              <Text className="text-[40px] text-[#0B646B] font-bold">
                {"Welcome :)"}
              </Text>
              <Text className="text-[20px] text-[#527283]">
                {user.nickname}
              </Text>
            </View>
            <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
              <Image
                className="w-full h-full rounded-md object-cover"
                source={userProfile}
              />
            </View>
          </View>

          <View className="px-4 mt-4">
            <View className="items-center justify-center">
              <Image
                source={require("../assets/HomeScreenImage.jpg")} 
                style={{ width: 300, height: 180 }} 
              />
            </View>
            <Text className="text-[#2C7379] text-[20px] font-bold">
              Category
            </Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row item-center justify-center px-8 mt-4">
              <MenuContainer
                key={"all"}
                title="All"
                type={type}
                setType={setType}
                setSelectedMenu={setSelectedMenu}
              />
              <MenuContainer
                key={"missing"}
                title="Missing"
                type={type}
                setType={setType}
                setSelectedMenu={setSelectedMenu}
              />
              <MenuContainer
                key={"found"}
                title="Found"
                type={type}
                setType={setType}
                setSelectedMenu={setSelectedMenu}
              />
              <MenuContainer
                key={"general"}
                title="General"
                type={type}
                setType={setType}
                setSelectedMenu={setSelectedMenu}
              />
            </View>
          </ScrollView>

          <View>
            <View className="flex-row items-center justify-between px-4 mt-4">
              <Text className="text-[#2C7379] text-[20px] font-bold">
                All Post
              </Text>
            </View>
            {selectedMenu === "all" ? <View></View> : null}
            <View className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap">
              {filteredData?.length > 0 ? (
                filteredData.map((item) => (
                  <ItemCardContainer
                    post={item}
                    navigation={navigation}
                    key={item.id}
                  />
                ))
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Image
                      source={require("../assets/logo.jpg")}
                      className="w-32 h-32 object-cover"
                    />
                    <Text className="text-2xl text-[#428288] font-semibold">
                      There are no posts from the community YET..
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
