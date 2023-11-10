import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
  ScrollView,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
//import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useUserContext } from "../context/userContext";
import { BASE_URL } from "../utils/utils";
import { Picker } from "@react-native-picker/picker";
import LoadingView from "../components/LoadingView";

const API_KEY = "AIzaSyCLOAAZfuZhFLjzSZcqDdpSIgaKxZ6nyng";

const GeneralPost = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [postTag, setPostTag] = useState("");
  const [formData, setFormData] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const { user } = useUserContext();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const searchLocation = async (text) => {
    setSearchKeyword(text);

    // If the search keyword is empty, don't perform a search
    if (text.trim() === "") {
      setSearchResults([]);
      setIsShowingResults(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${text}`
      );

      if (response.data.predictions.length > 0) {
        // Update the state with the new predictions, which will be displayed in the FlatList.
        // Do NOT fetch the place details here; you should do that only when the user selects a place.
        setSearchResults(response.data.predictions);
        setIsShowingResults(true);
      } else {
        setSearchResults([]);
        setIsShowingResults(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleResultPress = (description, placeId) => {
    setSelectedPlaceId(placeId);
    setSearchKeyword(description);
    setIsShowingResults(false);
    //Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handleSelectImage = () => {
    Alert.alert(
      "Upload Photo",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            const cameraPermission =
              await ImagePicker.requestCameraPermissionsAsync();
            if (cameraPermission.status !== "granted") {
              alert("Sorry, we need camera permissions to make this work!");
              return;
            }
            const cameraResult = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!cameraResult.canceled) {
              const asset = cameraResult.assets[0];
              const uri = asset.uri;
              setImageUri(uri);
              const type = asset.type;
              const name = uri.split("/").pop();
              let formData = new FormData();
              formData.append("multipartFile", {
                uri,
                type: "image/jpeg", // or whatever the file type is
                name,
              });
              setFormData(formData);
            }
          },
        },
        {
          text: "Choose from Library",
          onPress: async () => {
            const libraryPermission =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (libraryPermission.status !== "granted") {
              alert(
                "Sorry, we need camera roll permissions to make this work!"
              );
              return;
            }
            const libraryResult = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!libraryResult.canceled) {
              const asset = libraryResult.assets[0];
              const uri = asset.uri;
              setImageUri(uri);
              const type = asset.type;
              const name = uri.split("/").pop();
              let formData = new FormData();
              formData.append("multipartFile", {
                uri,
                type: "image/jpeg",
                name,
              });
              setFormData(formData);
            }
          },
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const uploadImage = async (formData) => {
    console.log("Sending data for uploading img...");
    // Step 3: Send the FormData object using Axios with the appropriate headers
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post(
        `http://${BASE_URL}:8080/post/uploadImg`,
        formData,
        config
      );
      const response = res.data;
      if (response.success === true) {
        // check if response is in valid format
        // Image uploaded successfully
        console.log("Image uploaded successfully. ID:", response.data.postId);
        return response.data.postId;
      } else {
        // Handle any other HTTP status codes
        console.log("Server responded with an unexpected status.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handlePickerFocus = () => {
    setIsPickerOpen((previousState) => !previousState); // Toggle the current state of the picker's open/close status
  };

  const validateForm = () => {
    if (!imageUri || !postTag || !selectedPlaceId || !content || !title) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields before submitting."
      );
      return false;
    }
    return true;
  };

  // Function to handle the form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      const isUploadImage = await uploadImage(formData);
      console.log("postId is " + isUploadImage);

      if (validateForm() && isUploadImage) {
        try {
          // Fetch the detailed information of the selected location
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?placeid=${selectedPlaceId}&key=${API_KEY}`
          );

          if (response.data.result) {
            // Extract the coordinates
            const location = response.data.result.geometry.location;

            // Log the coordinates

            console.log("Form submitted with the following data:");
            console.log("Selected location coordinates:", location);
            console.log(`Image URI: ${imageUri}`);
            console.log(`Description: ${description}`);

            const generalPostData = {
              latitude: location.lat,
              longitude: location.lng,
              userId: user.id,
              postType: "General",
              title: title,
              content: content,
              postId: isUploadImage,
            };

            try {
              const serverResponse = await axios.post(
                "http://" + BASE_URL + ":8080/post/uploadPost",
                generalPostData
              );
              console.log(serverResponse.data);
              if (serverResponse.data.success) {
                console.log(
                  "Data submitted successfully. ID:",
                  serverResponse.data.data.id
                );

                // Here, you can also proceed with other form submission tasks...
                // For example, sending data to a server.

                // After successful submission, clear the form fields

                setSelectedPlaceId(null);
                setDescription("");
                setImageUri("");
                setPostTag("");
                setTitle("");

                // or however you clear your location field
                // Clear other form fields as necessary

                // Use the navigation hook to navigate to another screen
                Alert.alert("Successfully Sumbmitted!");
                navigation.navigate("Home"); // replace 'NextScreen' with the actual name of your screen
                // ... (clear your form fields and navigate away)
              } else {
                console.log("Server responded with an unexpected status.");
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log("Failed to retrieve location details.");
          }
        } catch (error) {
          console.log("An error occurred during form submission:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* {isLoading ? (
        <LoadingView loading={isLoading} msg={"Please wait..."} />
      ) : ( */}
      <>
        <TouchableOpacity
          style={styles.backStyle}
          onPress={() => navigation.goBack()}
          className="mr-4"
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.locationContainer}>
          {/* Lost Location Input */}
          <View style={styles.autocompleteContainer}>
            <Text style={styles.inputLabel}> * Location</Text>
            <TextInput
              placeholder="Search for an address"
              returnKeyType="search"
              style={styles.searchBox}
              placeholderTextColor="#000"
              onChangeText={(text) => searchLocation(text)}
              value={searchKeyword}
            />
            {isShowingResults && (
              <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() =>
                      handleResultPress(item.description, item.place_id)
                    }
                  >
                    <Text>{item.description}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) =>
                  item.id ? item.id.toString() : index.toString()
                }
                style={styles.searchResultsContainer}
              />
            )}
          </View>
        </View>

        <ScrollView keyboardShouldPersistTaps="handled" styles={{ flex: 1 }}>
          <ScrollView
            style={styles.formContainer}
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={Keyboard.dismiss}
          >
            {/* Post title */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}> * Title</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={setTitle}
                value={title}
                placeholder="Enter post's title"
              />
            </View>

            {/* Post content */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}> * Content</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={setContent}
                value={content}
                placeholder="Enter post's content"
              />
            </View>

            {/* Image Selector Field */}
            <TouchableOpacity
              onPress={handleSelectImage}
              style={styles.imageSelector}
            >
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              ) : (
                <Text>Select Image</Text>
              )}
            </TouchableOpacity>

            {/* Tag selection */}
            <View style={styles.dropdownContainer}>
              <Text style={styles.inputLabel}> Select tag</Text>
              <View style={styles.container}>
                <Picker
                  selectedValue={postTag}
                  onValueChange={(itemValue, itemIndex) =>
                    setPostTag(itemValue)
                  }
                  style={styles.picker}
                  prompt="Select a tag..." // 这仅适用于Android
                  mode="dropdown" // 对Android有效，设置弹出模式
                >
                  <Picker.Item label="food" value="food" />
                  <Picker.Item label="park" value="park" />
                  <Picker.Item label="illness" value="illness" />
                  <Picker.Item label="custome" value="custome" />
                  <Picker.Item label="shop" value="shop" />
                  <Picker.Item label="newbie" value="newbie" />
                  <Picker.Item label="other" value="other" />
                </Picker>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>
      </>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  locationContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 1,
    marginBottom: -50,
    marginTop: 50,
  },

  formContainer: {
    marginTop: 40,
    paddingTop: 30,
    paddingHorizontal: 35,
    //paddingBottom:-50,
  },
  imageSelector: {
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "dashed",
    borderRadius: 1,
    width: 320,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20, // reduced space for the next form field
    marginTop: 50,
  },
  imagePreview: {
    width: 300,
    height: 90,
  },
  iconContainer: {
    // This is the new style for the icon container
    position: "absolute",
    right: 10, // for horizontal positioning - adjust as needed
    top: 7, // for vertical positioning - adjust as needed
    // You can also add padding, backgroundColor, etc., here if needed
  },

  inputContainer: {
    marginBottom: 0, // Space for the next form field
    // You can add more styling for the container if you need
    marginTop: 40,
  },
  inputLabel: {
    fontSize: 13, // or another appropriate size
    fontWeight: "bold",
    marginBottom: 6, // space below the label
    // ... any other styling you need
  },
  textInput: {
    height: 40, // or whatever height you find appropriate
    borderColor: "gray", // you can have a specific color for your project
    borderWidth: 1, // this is the border for the input field
    paddingLeft: 10, // space between text and the border
    borderRadius: 5, // if you want rounded corners
    // ... other styles you might want
  },

  map: {
    width: "100%",
    height: "70%", // Adjust as needed
  },

  autocompleteContainer: {
    position: "absolute",
    //marginTop: 20,
    paddingLeft: 35,
    flex: 100,
    zIndex: 10,
  },
  searchResultsContainer: {
    width: 320, // or '100%' if you want it to have the full width of the screen
    maxHeight: 200, // or whatever maximum height you want
    backgroundColor: "#fff",
    position: "absolute",
    top: 75, // this positions your results just below the TextInput field
    borderRadius: 5,
    zIndex: 100,
    marginLeft: 35,
    paddingLeft: 5,
  },
  resultItem: {
    width: "100%",
    justifyContent: "center",
    height: 50,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  searchBox: {
    width: 320, // or '100%' if you want it to have the full width of the screen
    height: 40,
    fontSize: 14,
    borderRadius: 5,
    borderColor: "grey",
    color: "#000",
    //backgroundColor: '#fff',
    borderWidth: 1,
    paddingLeft: 10,
  },

  submitButton: {
    backgroundColor: "plum", // Use your app's color scheme here
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    //marginTop: 10, // Adjust as needed for spacing from the last form field
    marginBottom: 60,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  dropdownLabel: {
    fontSize: 14, // or another appropriate size
    fontWeight: "bold",
    marginBottom: 10, // space below the label
    // ... any other styling you need
  },
  container: {
    flex: 1, // 使用 flex 布局，确保容器充满屏幕
    alignItems: "center", // 子项水平居中
    justifyContent: "center", // 子项垂直居中
    padding: 20, // 容器内部留有一定的空间
    borderColor: "gray", // you can have a specific color for your project
    borderWidth: 1, // this is the border for the input field
    paddingLeft: 10, // space between text and the border
    borderRadius: 5, // if you want rounded corners
    height: 40,
    marginBottom: 20,
  },
  picker: {
    width: 300, // 选择器的宽度
    height: 40, // or whatever height you find appropriates
    borderColor: "gray", // you can have a specific color for your project
  },
  backStyle: {
    marginLeft: 15,
    marginTop: 20,
  },
});

export default GeneralPost;
