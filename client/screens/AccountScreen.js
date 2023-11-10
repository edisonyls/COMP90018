import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useUserContext } from "../context/userContext";
import {
  uploadHead,
  uploadBackground,
  changeUserInfo,
} from "../api/ProfileAPI";
import LoadingView from "../components/LoadingView";

const AccountScreen = () => {
  const { user, updateUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundUri, setBackgroundUri] = useState(null);
  const [headUri, setHeadUri] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uploadProfilePic, setUploadProfilePic] = useState(false);
  const [uploadBackgroundPic, setUploadBackgroundPic] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);

      const storedName = user?.nickname ? user.nickname : "Null";
      const storedPhoneNumber = user?.mobile ? user.mobile : "Null";

      const storedBackgroundUri =
        user?.bgImg !== null
          ? { uri: user.bgImg }
          : require("../assets/BcakGround.jpg");
      const storedHeadUri =
        user?.profile !== "default"
          ? { uri: user.profile }
          : require("../assets/ProfileHead.jpg");

      setName(storedName);
      setPhoneNumber(storedPhoneNumber);
      setBackgroundUri(storedBackgroundUri);
      setHeadUri(storedHeadUri);
      setIsLoading(false);
    };

    loadProfileData();
  }, []);

  const updateUserProfile = async () => {
    try {
      setIsLoading(true);
      const updatedAttributes = {
        bgImg: backgroundUri.uri,
        mobile: phoneNumber,
        nickname: name,
        profile: headUri.uri,
      };

      const updatedUserInfo = {
        birthday: user.birthday,
        country: user.country,
        description: user.description,
        id: user.id,
        mobile: phoneNumber,
        nickname: name,
        postcode: user.postcode,
        sex: user.sex,
        state: user.state,
      };
      updateUser(updatedAttributes);
      console.log(updatedUserInfo);
      const response = await changeUserInfo(updatedUserInfo);
      setIsLoading(false);
    } catch (e) {
      console.error("fail", e);
      setIsLoading(false);
    }
  };

  const pickImage = async (isBackground) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const asset = result.assets[0];
      const uri = asset.uri;
      const type = asset.type;
      const name = uri.split("/").pop();
      let formData = new FormData();
      formData.append("file", {
        uri,
        type: "image/jpeg", // or whatever the file type is
        name,
      });

      if (isBackground) {
        setBackgroundUri({ uri, formData });
        setUploadBackgroundPic(true);
      } else {
        setHeadUri({ uri, formData });
        setUploadProfilePic(true);
      }
    }
  };

  const saveAndGoBack = async () => {
    setIsLoading(true);
    try {
      if (
        typeof backgroundUri === "object" &&
        backgroundUri.uri &&
        uploadBackgroundPic
      ) {
        console.log("background uploading...");
        await uploadBackground(user.id, backgroundUri.formData);
        setUploadBackgroundPic(false);
      }

      if (typeof headUri === "object" && headUri.uri && uploadProfilePic) {
        console.log("head uploading...");
        await uploadHead(user.id, headUri.formData);
        setUploadProfilePic(false);
      }

      await updateUserProfile();
      setIsLoading(false);
      navigation.goBack();
    } catch (e) {
      console.error("Failed to save profile information", e);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-white relative">
        <>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {isLoading ? (
              <LoadingView loading={isLoading} msg={"Uploading Profile..."} />
            ) : (
              <>
                <View style={styles.headerContainer}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="leftcircleo" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.headerTitle}>Account</Text>
                  <View />
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.backgroundImage}
                    source={backgroundUri}
                  />
                  <TouchableOpacity
                    style={styles.editIcon}
                    onPress={() => pickImage(true)}
                  >
                    <AntDesign name="edit" size={24} color="black" />
                  </TouchableOpacity>

                  <View style={styles.profileContainer}>
                    <Image style={styles.headImage} source={headUri} />
                    <TouchableOpacity
                      style={styles.editIcon}
                      onPress={() => pickImage(false)}
                    >
                      <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameLabel}>Username</Text>
                  <TextInput
                    style={styles.nameInput}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder="Enter your name"
                  />
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameLabel}>Phone Number</Text>
                  <TextInput
                    style={styles.nameInput}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    placeholder="Enter your phone number"
                  />
                </View>
              </>
            )}
          </ScrollView>
          <TouchableOpacity style={styles.saveButton} onPress={saveAndGoBack}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 20,
  },
  backgroundImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  editIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileContainer: {
    position: "absolute",
    top: 150,
    alignItems: "center",
  },
  headImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#FFF",
    overflow: "hidden",
  },
  saveButton: {
    backgroundColor: "#9747FF",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 50,
    marginTop: 20,
    shadowColor: "#9747FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  nameContainer: {
    margin: 20,
    marginBottom: 10,
    borderBottomColor: "#DDD",
    paddingBottom: 10,
  },
  nameLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  nameInput: {
    fontSize: 16,
    width: "100%",
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    marginTop: 5,
    textAlign: "center",
    padding: 10,
  },
});

export default AccountScreen;
