import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  RefreshControl,
} from "react-native";

import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import MenuContainer from "../components/MenuContainer";
import ItemCardContainer from "../components/ItemCardContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useUserContext } from "../context/userContext";
import { logoutAction, getAllPostsPerUser } from "../api/ProfileAPI";
import LoadingView from "../components/LoadingView";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const ProfileScreen = () => {
  const [type, setType] = useState("post");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Post");
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const navigation = useNavigation();
  //const isFocused = useIsFocused();
  const { user, updateUser } = useUserContext();
  const backgroundImgSource =
    user && user.bgImg !== null
      ? { uri: user.bgImg }
      : require("../assets/BcakGround.jpg");
  const profileHeadImgSource =
    user && user.profile !== "default"
      ? { uri: user.profile }
      : require("../assets/ProfileHead.jpg");

  const postTypeToBadge = {
    0: "Missing",
    1: "Found",
    2: "General",
  };

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      getAllPostsPerUser(user.id)
        .then((res) => {
          setMainData(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    getAllPostsPerUser(user.id)
      .then((res) => {
        setMainData(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    setIsLoading(true);
    getAllPostsPerUser(user.id)
      .then((res) => {
        setMainData(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    const result = await logoutAction(user.id);
    console.log(result.data);
    if (result) {
      updateUser(null);
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "SignIn" }],
      });
    } else {
      setIsLoading(false);
      Alert.alert("Success!", "You have been logged out");
      navigation.reset({
        index: 0,
        routes: [{ name: "SignIn" }],
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {isLoading ? (
        <LoadingView loading={isLoading} />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} 
              colors={["#0B646B"]} 
            />
          }
        >
          <View style={styles.imageContainer}>
            <Image
              
              style={styles.backgroundImage}
              source={backgroundImgSource}
            />

          
            <View style={styles.profileContainer}>
              <Image
               
                style={styles.headImage}
                source={profileHeadImgSource}
              />

              <Text style={styles.profileName}>{user.nickname}</Text>
            </View>
           
          </View>
          <View style={styles.menuSection}>
            <MenuContainer
              key={"post"}
              title="Post"
             
              type={type}
              setType={setType}
              setSelectedMenu={setSelectedMenu}
            />
            <MenuContainer
              key={"settings"}
              title="Settings"
      
              type={type}
              setType={setType}
              setSelectedMenu={setSelectedMenu}
            />
          </View>
          {selectedMenu === "Post" ? (
            <View className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                mainData.map((item) => (
                  <ItemCardContainer
                    post={item}
                    navigation={navigation}
                    key={item.id}
                    userId={user?.id}
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
                      You haven't posted anything
                    </Text>
                  </View>
                </>
              )}
            </View>
          ) : selectedMenu === "Settings" ? (
            <View>
              <Text style={styles.sectionTitle}>Account</Text>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Account")}
              >
                <View style={styles.iconContainer}>
                  <SimpleLineIcons name="user" size={24} color="black" />
                </View>
                <Text style={styles.menuText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Security")}
              >
                <View style={styles.iconContainer}>
                  <AntDesign name="lock1" size={24} color="black" />
                </View>
                <Text style={styles.menuText}>Security</Text>
              </TouchableOpacity>

            
              <Text style={styles.sectionTitle}>Help</Text>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("ContactUs")}
              >
                <View style={styles.iconContainer}>
                  <AntDesign name="phone" size={24} color="black" />
                </View>
                <Text style={styles.menuText}>Contact Us</Text>
              </TouchableOpacity>

              <Text style={styles.sectionTitle}>Log Out</Text>
              <TouchableOpacity style={styles.buttomMenuItem} onPress={handleLogout}>
                <View style={styles.iconContainer}>
                  <Feather name="log-out" size={24} color="black" />
                </View>

                <Text style={styles.menuText}>Log out</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    position: "relative", 
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 10,
  },
  menuSection: {
    flexDirection: "row", 
    justifyContent: "space-evenly", 
    marginTop: 20, 
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backgroundImage: {
    width: "100%", 
    height: 198, 
  },
  headImage: {
    width: 83,
    height: 83,
    position: "absolute", 
    bottom: 40, 
    borderRadius: 83 / 2,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
   
  },
  sectionContainer: {
    paddingHorizontal: 16,
    paddingTop: 16, 
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    marginTop: 10,
    textAlign: "left",
    marginBottom: 20,
    marginLeft: 10,
  },
  sectionImage: {
    width: 350, 
    height: 45, 

    marginBottom: 40, 
    marginLeft: 20,
    resizeMode: "cover", 
  },
  editIcon: {
    position: "absolute", 
    top: 10, 
    right: 10, 
  },
  menuItem: {
    flexDirection: "row", // Arrange icon and text in a row
    alignItems: "center", // Center align items
    paddingVertical: 10, // Add padding above and below
    paddingHorizontal: 16, // Add padding on the sides
    marginLeft: 20,
  },
  iconContainer: {
    width: 40, // Width of the circle
    height: 40, // Height of the circle
    borderRadius: 20, // Make it round
    backgroundColor: "#e0e0e0", // Grey background
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
    marginRight: 8, // Add space between the icon and the text
  },
  menuText: {
    fontSize: 16, // Increase font size
    color: "#333", // Dark grey color for the text
    marginLeft: 8, // Add space between the icon and the text
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 16,
  },
  
  buttomMenuItem: {
    flexDirection: "row", // Arrange icon and text in a row
    alignItems: "center", // Center align items
    paddingVertical: 10, // Add padding above and below
    paddingHorizontal: 16, // Add padding on the sides
    marginLeft: 20,
    marginBottom:60,
  },
});

export default ProfileScreen;
